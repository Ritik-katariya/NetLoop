import { Poll } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Request } from "express";

// Create Poll
const createPoll = async (req: Request): Promise<any> => {
  const data = await prisma.$transaction(
    async (tx) => {
      const { question, options, memberId, exploreId, ...otherData } = req.body;

      if (!question || !options || !Array.isArray(options) || options.length < 2) {
        throw new ApiError(httpStatus.BAD_REQUEST, "A question and at least two options are required");
      }

      if (exploreId) {
        const exploreExists = await prisma.explore.findUnique({
          where: { id: exploreId },
        });
        if (!exploreExists) {
          throw new ApiError(httpStatus.NOT_FOUND, "Explore not found");
        }
      }

      const expireAt = new Date();
      expireAt.setHours(expireAt.getHours() + 24);

      const poll = await tx.poll.create({
        data: {
          question,
          options,
          votes: Array(options.length).fill(0),
          totalvotes: 0,
          memberId,
          exploreId, 
          expireAt,
          ...otherData,
        },
      });

      return poll;
    },
    { timeout: 500000 }
  );

  return data;
};

// Get a single Poll by ID
const getPoll = async (id: string): Promise<Poll | null> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.poll.findUnique({
    where: { id },
    include: {
      member: true,
      explore: true,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Poll not found");
  }

  return result;
};

// Get all Polls
const getAllPolls = async (): Promise<Poll[]> => {
  const result = await prisma.poll.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      member: {
        include: {
          profile: { select: { img: true } },
          verified: true,
          networks: { select: { id: true, name: true } },
        },
      },
    },
  });
  return result;
};

// Update Poll
const updatePoll = async (req: Request): Promise<Poll> => {
  const id = req.params.id as string;
  const { question, options, expireAt, ...otherData } = req.body;

  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  if (options && (!Array.isArray(options) || options.length < 2)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "At least two options are required");
  }

  const result = await prisma.poll.update({
    where: { id },
    data: {
      question,
      options,
      expireAt: expireAt ? new Date(expireAt) : undefined,
      ...otherData,
    },
  });

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Poll not found");
  }

  return result;
};

// Delete Poll
const deletePoll = async (id: string): Promise<any> => {
  if (!id) throw new ApiError(httpStatus.BAD_REQUEST, "ID is required");

  const result = await prisma.$transaction(async (tx) => {
    const poll = await tx.poll.delete({
      where: { id },
    });
    return poll;
  });

  return result;
};

// Get Polls by Explore ID
const getPollsByExplore = async (exploreId: string): Promise<Poll[]> => {
  if (!exploreId) throw new ApiError(httpStatus.BAD_REQUEST, "Explore ID is required");

  const result = await prisma.poll.findMany({
    where: { exploreId },
    orderBy: { createdAt: "desc" },
  });

  return result;
};

// Vote on a Poll
const votePoll = async (pollId: string, memberId: string, optionIndex: number): Promise<Poll> => {
  if (!pollId) throw new ApiError(httpStatus.BAD_REQUEST, "Poll ID is required");
  if (!memberId) throw new ApiError(httpStatus.BAD_REQUEST, "Member ID is required");

  const poll = await prisma.poll.findUnique({
    where: { id: pollId },
    include: { voter: true },
  });

  if (!poll) {
    throw new ApiError(httpStatus.NOT_FOUND, "Poll not found");
  }

  if (poll.voter.some((voter) => voter.id === memberId)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You have already voted on this poll");
  }

  if (optionIndex < 0 || optionIndex >= poll.options.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Invalid option index");
  }

  poll.votes[optionIndex] += 1;

  const updatedPoll = await prisma.poll.update({
    where: { id: pollId },
    data: {
      votes: poll.votes,
      totalvotes: poll.totalvotes + 1,
      voter: { connect: { id: memberId } },
    },
  });

  return updatedPoll;
};

// Export Poll Service
export const pollService = {
  createPoll,
  getPoll,
  getAllPolls,
  updatePoll,
  deletePoll,
  getPollsByExplore,
  votePoll,
};
