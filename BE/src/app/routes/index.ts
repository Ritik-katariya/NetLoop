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
  }
  ,
  {
    path:"/cluster",
    route:clusterRouter, 
  }
  ,
  {
    path:"/post",
    route:postRouter, 
  }
  ,
  {
    path:"/verification",
    route:verificationRouter, 
  }
  ,
  {
    path:"/chat",
    route:chatRoutes, 
  }
  ,
  {
    path:"/messages",
    route:messageRoutes, 
  }
  ,
  {
    path:"/request",
    route:chatRequestRoutes, 
  }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
