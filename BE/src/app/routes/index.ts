import express from "express";
import { memberRouter } from "../modules/member/member.routes";
import { AuthRouter } from "../modules/auth/auth.routes";
import { profileRouter } from "../modules/profile/profile.routes";
import { detailsRouter } from "../modules/details/details.routes";
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
  }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
