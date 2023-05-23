import express from "express";
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";
import httpStatus from "http-status";
import _ from "lodash";
import routes from "./routes";
import { errorConverter, errorHandler } from "./middleware/errorHandler";
import moment from "moment";
export const app = express();

app.use(cors());
app.options("*", cors());

// set security HTTP headers
app.use(helmet({contentSecurityPolicy: false}));

// parse json request body
app.use(express.json({ limit: "50mb" }));
// parse urlencoded request body
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// sanitize request data
app.use(xss());

// api routes
app.use('/api', routes);

// Health check
app.get("/", (req, res) => {
  return res.status(200).send("healthy");
});

// send back a 404 error for any unknown api request
app.use((req, res) => {
  return res.sendStatus(httpStatus.NOT_IMPLEMENTED);
});

app.use(errorConverter);

app.use(errorHandler);

app.use((req, res, next) => {
  if (!req.locals) req.locals = {};
  next();
});
