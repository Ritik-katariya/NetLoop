import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const toggleLike = async (
  memberId: string,
  targetType: 'post' | 'network' | 'cluster' | 'comment' | 'story' | 'explore',
  targetId: string
) => {
  const memberExists = await prisma.members.findUnique({ where: { id: memberId } });
  if (!memberExists) throw new ApiError(httpStatus.NOT_FOUND, "Member not found");

  const targetMap = {
    post: "postId",
    network: "networkId",
    cluster: "clusterId",
    comment: "commentId",
    story: "storyId",
    explore: "exploreId",
  } as const;

  const targetField = targetMap[targetType];

  let targetExists = false;
  switch (targetType) {
    case 'post':
      targetExists = !!(await prisma.post.findUnique({ where: { id: targetId } }));
      break;
    case 'network':
      targetExists = !!(await prisma.network.findUnique({ where: { id: targetId } }));
      break;
    case 'cluster':
      targetExists = !!(await prisma.cluster.findUnique({ where: { id: targetId } }));
      break;
    case 'comment':
      targetExists = !!(await prisma.comments.findUnique({ where: { id: targetId } }));
      break;
    case 'story':
      targetExists = !!(await prisma.story.findUnique({ where: { id: targetId } }));
      break;
    case 'explore':
      targetExists = !!(await prisma.explore.findUnique({ where: { id: targetId } }));
      break;
  }

  if (!targetExists) throw new ApiError(httpStatus.NOT_FOUND, `${targetType} not found`);

  const existingLike = await prisma.likes.findFirst({
    where: { memberId, [targetField]: targetId },
  });

  if (existingLike) {
    await prisma.likes.delete({ where: { id: existingLike.id } });
    return { message: 'Unliked successfully' };
  } else {
    try {
      const data: any = {
        member: { connect: { id: memberId } }
      };

      switch (targetType) {
        case 'post':
          data.post = { connect: { id: targetId } };
          break;
        case 'network':
          data.network = { connect: { id: targetId } };
          break;
        case 'cluster':
          data.cluster = { connect: { id: targetId } };
          break;
        case 'comment':
          data.comments = { connect: { id: targetId } };
          break;
        case 'story':
          data.story = { connect: { id: targetId } };
          break;
        case 'explore':
          data.explore = { connect: { id: targetId } };
          break;
      }

      const newLike = await prisma.likes.create({ data });
      return { message: 'Liked successfully', like: newLike };
    } catch (error) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Like operation failed");
    }
  }
};

const getLikes = async (
  targetType: 'post' | 'network' | 'cluster' | 'comment' | 'story' | 'explore',
  targetId: string,
  page = 1,
  limit = 10
) => {
  const skip = (page - 1) * limit;
  const targetMap = {
    post: "postId",
    network: "networkId",
    cluster: "clusterId",
    comment: "commentId",
    story: "storyId",
    explore: "exploreId",
  } as const;
  const targetField = targetMap[targetType];

  const likes = await prisma.likes.findMany({
    where: { [targetField]: targetId },
    include: { member: { select: { id: true, name: true, profile: { select: { img: true } } } } },
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  const total = await prisma.likes.count({ where: { [targetField]: targetId } });
  return { likes, meta: { total, page, limit, hasMore: skip + limit < total } };
};

const checkLikeStatus = async (
  memberId: string,
  targetType: 'post' | 'network' | 'cluster' | 'comment' | 'story' | 'explore',
  targetId: string
) => {
  const targetMap = {
    post: "postId",
    network: "networkId",
    cluster: "clusterId",
    comment: "commentId",
    story: "storyId",
    explore: "exploreId",
  } as const;
  const targetField = targetMap[targetType];

  const like = await prisma.likes.findFirst({ where: { memberId, [targetField]: targetId } });
  return { isLiked: !!like };
};

export const likeService = { toggleLike, getLikes, checkLikeStatus };
