const http = require("http");
const PORT = 2000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { "content-type": "text/plain" });
  data = {
    message: "we are learning Backend with 30 students",
  };
  // res.end("Hello world..")
  res.end(JSON.stringify(data));
});
server.listen(PORT, () => {
  console.log("Server is running");
});
