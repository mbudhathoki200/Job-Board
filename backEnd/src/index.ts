import express from "express";
import config from "./config";
import router from "./routes";
import cors from "cors";
import { requestLogger } from "./middleware/logger.middleware";
import {
  genericErrorHandler,
  notFoundError,
} from "./middleware/errorHandler.middleware";

const app = express();

app.use(cors());

app.use(express.json());

app.use(requestLogger);

app.use(router);

app.use(notFoundError);

app.use(genericErrorHandler);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
