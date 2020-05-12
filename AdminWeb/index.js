require("dotenv").config();

const webpack = require("webpack");
const proxy = require("express-http-proxy");
const path = require("path");
const fs = require("fs");
const webpackConfig = require("./webpack.config.dev");

const express = require("express");
const app = express();
const compiler = webpack(webpackConfig);

app.use(
  require("webpack-dev-middleware")(compiler, {
    hot: true,
    publicPath: "/",
    watchOptions: {
      aggregateTimeout: 200,
      poll: 500,
    },
  })
);
app.use("/", express.static(path.join(__dirname, "./public")));
app.use("/api", proxy("http://localhost:5000"));

app.get("/*", function (req, res) {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
  fs.readFile(__dirname + "/public/index.html", "utf8", (err, text) => {
    if (!err) {
      res.send(text);
    }
  });
});

const port = process.env.DEV_PORT;

app.listen(port, function (err) {
  if (err) {
    return;
  }
  console.log("App started on " + port + " port");
});
