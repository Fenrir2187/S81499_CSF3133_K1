// Error 1 (grade.js, Line 10 & 11): Missing '=' assignment operator in both lines and mismatched ')' instead of ']' in document.forms["gradeForm"]["mark").value.
// Error 2 (grade.js, Line 12): Used single '=' assignment (name = "") instead of comparison (name === "").
// Error 3 (grade.js, Line 16 & 21): Misspelled isNaN() as isNan(), and used '&&' instead of '||' in (mark < 0 && mark > 100) since a number cannot be both < 0 and > 100.
// Error 4 (grade.js, Line 24, 31, 32, 34): Missing '=' in mark = parseInt(mark), missing ')' in else if (mark >= 50), lowercase grade "c" instead of "C", and missing '=' in grade = "F".
// Error 5 (grade.js, Line 36-39): Wrong method casing getElementByID, missing '=' and quotes around " got grade ", misspelled style.colour (must be style.color), and return true caused page reload (changed to return false).
// Error 6 (grade.js, Line 46-50): Loop started at i = 1 instead of i = 0 (skipping grade A), closing </table> tag was inside the loop, and innerHtml had wrong casing (fixed to innerHTML).


function checkMark() {
  let name = document.forms["gradeForm"]["name"].value;
  let mark = document.forms["gradeForm"]["mark"].value;
  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }
  if (isNaN(mark)) {
    alert("Please enter a valid numeric value.");
    return false;
  }
  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }
  mark = parseInt(mark);
  let grade;
  if (mark >= 80) {
    grade = "A";
  } else if (mark >= 65) {
    grade = "B";
  } else if (mark >= 50) {
    grade = "C";
  } else {
    grade = "F";
  }
  document.getElementById("result").innerHTML =
    name + " got grade " + grade;
  document.getElementById("result").style.color = "green";
  return false;
}

function showTable() {
  let grades = ["A", "B", "C", "F"];
  let ranges = ["80-100", "65-79", "50-64", "0-49"];
  let tableHTML = "<table>";
  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }
  tableHTML += "</table>";
  document.getElementById("tableContainer").innerHTML = tableHTML;
}