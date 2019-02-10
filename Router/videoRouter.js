import express from "express";
import routes from "../routes";
import {
  getUpload,
  videoDetail,
  getVideoEdit,
  postVideoEdit,
  deleteVideo,
  postUpload
} from "../controller/videoController";
import { uploadVideo, onlyPrivate } from "../middleware";

const videoRouter = express.Router();

videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload); // upload

videoRouter.get(routes.videoDetail(), videoDetail);

videoRouter.get(routes.videoEdit(), onlyPrivate, getVideoEdit);
videoRouter.post(routes.videoEdit(), onlyPrivate, postVideoEdit);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
