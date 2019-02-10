import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "upload/videos/" });

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = "Wetube"; // locals 기능을 사용하여 app.use로 보내면 그 뒤에있는 router에서 전역변수로 사용할 수 있다.
  res.locals.routes = routes;
  // fake user information
  res.locals.user = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
