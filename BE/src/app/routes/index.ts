import express from "express";
import { memberRouter } from "../modules/member/member.routes";
import { AuthRouter } from "../modules/auth/auth.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path:"/member",
    route:memberRouter,
  },
  {
    path:"/auth",
    route:AuthRouter,
  }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
