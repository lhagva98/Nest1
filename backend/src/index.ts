import * as http from "http";

require("dotenv").config();

console.log("Running as " + process.env.NODE_ENV + " mode");

import expressApp from "./server";
const server = http.createServer(expressApp);

const PORT = process.env.SERVER_PORT;

server.listen(PORT, () => {
  console.log("Express server listening on port " + PORT);
});
