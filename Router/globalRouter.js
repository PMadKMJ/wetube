import express from "express";
import passport from "passport";
import routes from "../routes"; // App.js 와 Router 쪽 둘다 연결 필요!
import { home, search } from "../controller/videoController";
import {
  postJoin,
  getJoin,
  getLogin,
  logout,
  postLogin,
  githubLogin,
  postGithubLogin
} from "../controller/userController";
import { onlyPublic, onlyPrivate } from "../middleware";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.logout, onlyPrivate, logout);

globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: "/login" }),
  postGithubLogin
);

export default globalRouter;
