import express from "express";
import { memberRouter } from "../modules/member/member.routes";
import { AuthRouter } from "../modules/auth/auth.routes";
import { profileRouter } from "../modules/profile/profile.routes";
import { detailsRouter } from "../modules/details/details.routes";
import { networkRouter } from "../modules/network/network.routes";
import { clusterRouter } from "../modules/cluster/cluster.routes";
import { postRouter } from "../modules/post/post.routes";
import { verificationRouter } from "../modules/verification/verification.routes";
import { chatRoutes } from "../modules/chat/chat.route";
import { messageRoutes } from "../modules/message/message.route";
import { chatRequestRoutes } from "../modules/chatRequest/chatRequest.route";
import { exploreRouter } from "../modules/Explore/explore.route";
import { newsRouter } from "../modules/News/news.route";
import { pollRouter } from "../modules/poll/poll.route";
import { ratingRouter } from "../modules/rating/rating.route";
import { promotionRouter } from "../modules/Promotion/promotion.route";
import { storyRouter } from "../modules/story/story.route";
import { searchRouter } from '../modules/search/search.route';
import { likeRouter } from '../modules/like/like.route';
import { commentRouter } from "../modules/comment/comment.route";
import { savedPostRouter } from '../modules/SavedPost/savedPost.route';

const router = express.Router();

const moduleRoutes = [
  {
    path:"/member",
    route:memberRouter,
  },
  {
    path:"/auth",
    route:AuthRouter,
  },
  {
    path:"/profile",
    route:profileRouter, 
  },
  {
    path:"/details",
    route:detailsRouter, 
  },
  {
    path:"/network",
    route:networkRouter, 
  },
  {
    path:"/cluster",
    route:clusterRouter, 
  },
  {
    path:"/post",
    route:postRouter, 
  },
  {
    path:"/verification",
    route:verificationRouter, 
  },
  {
    path:"/chat",
    route:chatRoutes, 
  },
  {
    path:"/messages",
    route:messageRoutes, 
  },
  {
    path:"/request",
    route:chatRequestRoutes, 
  },
  {
    path:"/explore",
    route:exploreRouter, 
  },
  {
    path:"/news",
    route:newsRouter, 
  },
  {
    path:"/poll",
    route:pollRouter, 
  },
  {
    path:"/rating",
    route:ratingRouter, 
  },
  {
    path:"/promotion",
    route:promotionRouter, 
  },
  {
    path:"/story",
    route:storyRouter, 
  },
  {
    path: '/search',
    route: searchRouter,
  },
  {
    path: '/like',
    route: likeRouter,
  },
  {
    path: '/comment',
    route: commentRouter,
  },
  {
    path: '/saved',
    route: savedPostRouter,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
