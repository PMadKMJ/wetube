import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import session from "express-session";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import userRouter from "./Router/userRouter";
import videoRouter from "./Router/videoRouter";
import globalRouter from "./Router/globalRouter";
import routes from "./routes";
import { localMiddleware } from "./middleware";

import "./passport";

// express execute
const app = express();

const CokieSotre = MongoStore(session);

// install set up
app.use(helmet()); // 보안
app.set("view engine", "pug"); // pug로 view 설정.
app.use("/upload", express.static("upload"));
app.use("/static", express.static("static"));
app.use(cookieParser()); // 사용자의 쿠키를 전달받아서 사용/검중할 수 있게끔 해주는 미들웨어
app.use(bodyParser.json()); // 사용자가 웹사이트로 전달하는 정보를 검사하는 미들웨어 (form, json 등의 회원로그인 등의 body 검사)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev")); // logging 기록
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    // mongoDB 와 mongoose 연결 => cookie를 새로고침해도 로그인이 풀리지 않고 쿠키를 유지 하게 한다.
    store: new CokieSotre({
      mongooseConnection: mongoose.connection
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

// middleware local to global
app.use(localMiddleware);

// router set up
app.use(routes.home, globalRouter);
app.use(routes.user, userRouter);
app.use(routes.video, videoRouter);

export default app;
