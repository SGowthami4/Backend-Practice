// fs-file system
const fs = require("fs");
// fs.writeFile("example.csv", "name,age,phone", (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log("We wrote to a file today");
// });

// fs.readFile("example.txt", "utf8", (err, data) => {
//   // The text that we read will be in data object
//   console.log(data);
// });

// fs.appendFile("example.txt", "with 31 students", (err) => {
//   console.log("Content appended");
// });

// to delete unlink

// fs.unlink("example.txt", (err) => {
//   console.log("File Deleted");
// });

fs.mkdir("JTD Testing", (err) => {
  console.log("Folder created");
});
//Z
