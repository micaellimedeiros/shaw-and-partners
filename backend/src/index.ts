import express from "express";

import bodyParser from "body-parser";
import cors from "cors";

import { uploadFile, searchUsers } from "./controllers/csvController";
import { upload } from "./middlewares/fileUploadMiddleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.post("/api/files", upload, uploadFile);
app.get("/api/users", searchUsers);

app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error." });
  }
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
