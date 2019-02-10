import "./db";
import dotenv from "dotenv";
import app from "./App";
import "./model/Video";
import "./model/Comment";
import "./model/User";

dotenv.config();

const PORT = process.env.PORT || 3000;

const handleProfile = () => {
  console.log("i'm listening");
};

app.listen(PORT, handleProfile);
