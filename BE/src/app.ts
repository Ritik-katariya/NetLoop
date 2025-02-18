import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import CookieParser from "cookie-parser";
import httpStatus from "http-status";
import ApiError from "./errors/apiError";
import router from "./app/routes";
import config from "./config";
import { app, server } from "./socketio/server";
import passport from "./helper/passport_jwt";

app.use(cors({ origin: '*' }));

app.use(CookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(passport.initialize());

require("./helper/passport_jwt");

app.get("/favicon.ico", (req: Request, res: Response) => {
  res.status(204).end();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World! I am all are good!");
});
app.get("/health", (req: Request, res: Response) => {
  res.send("Health is ok!");
});

app.use("/api/v1", router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({ success: false, message: err.message });
  } else {
    res.status(httpStatus.NOT_FOUND).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
  next();
});

export { app, server };
