import * as Express from "express";
import * as http from "http";
import * as path from "path";
import * as morgan from "morgan";
import * as compression from "compression";
import FetchMiddleware from "./FetchMiddleware";
import SubmitMiddleware from "./SubmitMiddleware";
import MessageMiddleware from "./MessageMiddleware";

require("dotenv").config();

// Create the Express webserver
const express = Express();
const port = process.env.port || process.env.PORT || 3007;

express.use(Express.urlencoded({ extended: true }));

// Add simple logging
express.use(morgan("tiny"));

express.use(compression());

express.use("/scripts", Express.static(path.join(__dirname, "web/scripts")));
express.use("/assets", Express.static(path.join(__dirname, "web/assets")));

express.use(Express.json());

express.use("/bot", FetchMiddleware);
express.use("/bot", SubmitMiddleware);
express.use("/bot", MessageMiddleware);

express.use("/", Express.static(path.join(__dirname, "web/"), {
    index: "index.html"
}));

express.set("port", port);

http.createServer(express).listen(port, () => {
    console.log(`Server running on ${port}`);
});
