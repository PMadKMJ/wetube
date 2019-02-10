import express from "express";
import routes from "../routes";
import {
  userDetail,
  userEditProfile,
  changePassword
} from "../controller/userController";
import { onlyPrivate } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.userEditProfile, onlyPrivate, userEditProfile);
userRouter.get(routes.changePassword, onlyPrivate, changePassword);
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
