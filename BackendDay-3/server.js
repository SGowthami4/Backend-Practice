const http = require("http");
const fs = require("fs");
const path = require("path");
const PORT = 3001;
const filePath = path.join(__dirname, "studentsInfo");
// console.log(filePath);

function readData() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}
function writeData(data) {
  fs.writeFileSync("studentsInfo.json", JSON.stringify(data));
}
const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  if (method === "GET" && url === "/message") {
    res.writeHead(200, { "content-type": "text/plain" });
    data = {
      message: "we are learning backend",
    };
    res.end("Hello.....");
  }
  //   read stream-chunks of data
  else if (method === "POST" && url === "/students") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const newItem = JSON.parse(body);
      const students = readData();

      newItem.rollNo = students.length
        ? students[students.length - 1].rollNo + 1
        : 1; // Auto-increment ID
      students.push(newItem);
      writeData(students);
      res.writeHead(201, { "content-type": "application/json" });
      res.end(JSON.stringify(newItem));
    });
  } else if (method === "GET" && url === "/students") {
    const items = readData();
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(items));
  } else if (method === "GET" && url.startsWith("/students/")) {
    const rollNo = parseInt(url.split("/")[2]);
    const students = readData();
    const student = students.find((i) => i.rollNo == rollNo);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(student));
  } else if (method === "DELETE" && url.startsWith("/students/")) {
    const rollNo = parseInt(url.split("/")[2]);
    const students = readData();
    const index = students.findIndex((i) => i.rollNo == rollNo);
    const deletedInfo = students.splice(index, 1);
    writeData(students);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(deletedInfo));
  } else if (method === "PUT" && url.startsWith("/students/")) {
    const rollNo = parseInt(url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const upDatedInfo = JSON.parse(body);
      const students = readData();
      const index = students.findIndex((i) => i.rollNo == rollNo);
      students[index] = { ...students[index], ...upDatedInfo, rollNo };
      writeData(students);
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify(students[index]));
    });
  }
});

server.listen(PORT, () => {
  console.log("Server started");
});
