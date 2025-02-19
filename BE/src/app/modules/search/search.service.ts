import prisma from "../../../shared/prisma";

const searchAll = async (query: string) => {
  const members = await prisma.members.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {id:true,
      name: true,
    
      profile: {
        select: {
          img: true,
        },
      },
      verified: {
        select: {
          verified: true,
        },
      },
    },
    take: 5,
  });

  const networks = await prisma.network.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { about: { contains: query, mode: 'insensitive' } },
      ],
    },
    select: {
      id: true,
      name: true,
      logo: true,
      verified: true,
    },
    take: 5,
  });

  return {
    members,
    networks,
  };
};

export const searchService = {
  searchAll,
}; 