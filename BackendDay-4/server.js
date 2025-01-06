const express = require("express");
const fs = require("fs");
const PORT = 3000;
const path = require("path");
const filePath = path.join(__dirname, "data.json");
const app = express();
app.use(express.json());

function readData() {
  const data = fs.readFileSync(filePath, "utf8");
  return JSON.parse(data);
}
function writeData(data) {
  fs.writeFileSync("data.json", JSON.stringify(data));
}
app.get("/students", (req, res) => {
  res.status(200).json(readData());
});
app.post("/students", (req, res) => {
  const newStudent = req.body;
  const students = readData();
  newStudent.rollNo = students.length
    ? students[students.length - 1].rollNo + 1
    : 1;
  students.push(newStudent);
  writeData(students);
  res.status(201).json(newStudent);
});
app.put("/students/:rollNo", (req, res) => {
  const rollNo = parseInt(req.params.rollNo);
  const upDatedStudent = req.body;
  const students = readData();
  const index = students.findIndex((i) => i.rollNo === rollNo);
  students[index] = { ...students[index], ...upDatedStudent, rollNo };
  writeData(students);
  res.status(200).json(students[index]);
});
app.delete("/students/:rollNo", (req, res) => {
  const rollNo = parseInt(req.params.rollNo);
  const students = readData();
  const index = students.findIndex((i) => i.rollNo === rollNo);
  const deletedInfo = students.splice(index, 1);
  writeData(students);
  res.status(200).json(deletedInfo);
});
app.listen(PORT, () => {
  console.log("Server is running");
});
