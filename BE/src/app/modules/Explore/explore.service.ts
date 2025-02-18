import { Explore } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";

// Helper: Format explore data into { type, data } structure
const formatExploreData = (explores: any[]) => {
  return explores.flatMap(explore => [
    ...explore.news.map((item: any) => ({ type: 'news', data: item })),
    ...explore.events.map((item: any) => ({ type: 'events', data: item })),
    ...explore.poll.map((item: any) => ({ type: 'poll', data: item })),
    ...explore.rating.map((item: any) => ({ type: 'rating', data: item })),
    ...explore.promotion.map((item: any) => ({ type: 'promotion', data: item })),
  ]);
};

// Helper: Sort explores (latest first, prioritize >10 likes)
const sortExplores = (explores: any[]) => {
  return explores
    .map(exp => ({ ...exp, totalLikes: exp.likes.length }))
    .sort((a, b) => (b.totalLikes > 10 && a.totalLikes <= 10 ? 1 : -1))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Helper: Shuffle array (for random order)
const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

// Get Explore by ID (Supports sorted & random order)
const getExplore = async (id: string, random: boolean = false): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const explore = await prisma.explore.findUnique({
    where: { id },
    include: {
      news: { where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}}
        }
      },
      events: { where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}}
        }
      },
      poll: {where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}},
          voter:{select:{name:true,id:true}}
        }
      },
      rating: {where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}},
          voter:{select:{name:true,id:true}}
        }
      },
      promotion: {where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}}
        }
      },
      likes: true,
      comments: true,
      share: true,
    },
  });

  if (!explore) {
    throw new ApiError(httpStatus.NOT_FOUND, "Explore not found");
  }

  const formattedData = formatExploreData([explore]);

  return random ? shuffleArray(formattedData) : formattedData;
};

// Get all Explores (Latest first, prioritize >10 likes)
const getAllExplores = async (): Promise<any[]> => {
  const explores = await prisma.explore.findMany({
    include: {
      news: {where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,verified:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}}
        }
      },
      events: {where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}}
        }
      },
      poll: {where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}},
          voter:{select:{name:true,id:true}}
        }
      },
      rating: {where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}},
          voter:{select:{name:true,id:true}}
        }
      },
      promotion: {where: { expireAt: { gte: new Date() } },
        include:{
          member:{select:{name:true,id:true,profile:{select:{img:true}},networks:{select:{id:true,name:true}}}}
        }
      },
      likes: true,
      comments: true,
      share: true,
    },
    orderBy: { createdAt: 'desc' }
  });

  return formatExploreData(sortExplores(explores));
};

// Create Explore
const createExplore = async (req: Request): Promise<Explore> => {
  const { networkId, ...otherData } = req.body;

  const networkExists = await prisma.network.findUnique({ where: { id: networkId } });
  if (!networkExists) {
    throw new ApiError(httpStatus.NOT_FOUND, "Network not found");
  }

  return await prisma.explore.create({ data: { ...otherData, networkId } });
};

// Update Explore
const updateExplore = async (req: Request): Promise<Explore> => {
  const id = req.params.id;
  const { ...otherData } = req.body;

  return await prisma.explore.update({ where: { id }, data: otherData });
};

// Delete Explore
const deleteExplore = async (id: string): Promise<Explore> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  return await prisma.explore.delete({ where: { id } });
};

export const exploreService = {
  createExplore,
  getExplore,
  getAllExplores,
  updateExplore,
  deleteExplore,
};
