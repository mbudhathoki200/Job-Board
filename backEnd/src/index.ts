import express from "express";
import config from "./config";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(router);

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
});
