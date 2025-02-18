import bodyParser from "body-parser";
import { connectDB } from "./database";

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

import { userRoutes } from "./routes/user";

const app = express();
const PORT = process.env.PORT || 3500;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan("tiny"));
app.use(cors());

//routes
app.get("/api", (_: any, res: any) => {
  res.send("Welcome");
});

app.use(userRoutes);

app.listen(PORT, () => {
  console.log(`...server running on port ${PORT}`);
});

const main = () => {
  connectDB();
};

main();
