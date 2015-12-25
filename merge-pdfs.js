console.log("Making variables\n")
var fs = require("fs");
var exec = require("child_process").exec;
var chalk = require("chalk");
console.log("Variables loaded\n")

console.log("Running a massive if else script...\n")
var pdfs =
fs.readdirSync("./output/pdf")
.map(function(name) {
  var match = /(\d+)\.pdf/.exec(name);
  if (match) {
    return parseInt(match[1]);
  }
  else {
    return null;
  }
})
.filter(function(name) {
  return name !== null;
})
.sort(function(a, b) {
  if (a > b) {
    return 1;
  }
  else {
    return -1;
  }
})
.map(function(name) {
  return "./output/pdf/" + name + ".pdf";
});
console.log("If/else statement run.\n")

console.log("Creating variable for command...")
var command = "pdftk "
+ pdfs.join(" ")
+ " cat output output/diary.pdf";
console.log("Variable created.\n")

console.log("Running command...\n")
exec(command, function(err, stdout, stderr) {
  if (err) {
    console.log("Error:", err);
  }
  else {
    console.log(stdout);
    console.log("PDFs merged to output/diary.pdf")
  }
})
console.log("Merge-pdfs.js has finished running.\n")
