import express from "express";

import "./db/dbConnection.js";
import authRouter from "./src/modules/auth/auth.routes.js";
import messageRouter from "./src/modules/message/message.routes.js";

const app = express();

// 1) MIDDLEWARES
app.use(express.json());

// 2) ROUTES
app.use("/auth", authRouter);
app.use("/messages", messageRouter);

// 3) GLOBAL ERROR HANDLER
app.use((error, req, res, next) => {
  const { statusCode, status, message } = error;
  res
    .status(statusCode || 500)
    .json({ status: status, message: message || "Internal Server Error" });
});

// 4) SERVER
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
