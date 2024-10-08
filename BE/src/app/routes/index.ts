import express from "express";

import { UserRouter } from "../modules/user/user.route";
import { TableRouter } from "../modules/table/table.route";
import { ownerRouter } from "../modules/owner/owner.routes";
import { AuthRouter } from "../modules/auth/auth.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRouter,
  },
  {
    path: "/table",
    route: TableRouter,
  },
  {
    path:"/owner",
    route:ownerRouter,
  },
  {
    path:"/auth",
    route:AuthRouter,
  }
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
