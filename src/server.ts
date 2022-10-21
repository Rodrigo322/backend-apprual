import cors from "cors";
import express from "express";
import path from "path";

import { router } from "./routes";

const PORT = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.use("/images", express.static(path.join(__dirname, "..", "uploads")));

app.listen(PORT, () =>
  console.log(`server is running at http://localhost:${PORT}`)
);
