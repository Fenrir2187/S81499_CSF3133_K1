function generateRandomMark() {
  let randomMark = Math.floor(Math.random() * 101);
  document.getElementById("mark").value = randomMark;
}

function checkMark() {
  let name = document.forms["gradeForm"]["name"].value.trim();
  let markInput = document.forms["gradeForm"]["mark"].value.trim();

  if (name === "") {
    alert("Name must be filled out.");
    return false;
  }

  if (markInput === "") {
    alert("Mark field cannot be empty.");
    return false;
  }

  if (isNaN(markInput)) {
    alert("Please enter a valid numeric value.");
    return false;
  }

  let mark = Number(markInput);

  if (mark < 0 || mark > 100) {
    alert("Mark must be between 0 and 100.");
    return false;
  }

  let grade;
  let resultElement = document.getElementById("result");

  if (mark >= 80) {
    grade = "A";
    resultElement.style.color = "green";
  } else if (mark >= 65) {
    grade = "B";
    resultElement.style.color = "green";
  } else if (mark >= 50) {
    grade = "C";
    resultElement.style.color = "orange";
  } else {
    grade = "F";
    resultElement.style.color = "red";
  }

  resultElement.innerHTML = name + " got grade " + grade;
  let timeElement = document.getElementById("checkedTime");
  timeElement.innerHTML = "Checked on: " + new Date();
  timeElement.style.color = resultElement.style.color;

  return false;
}

function showTable() {
  let grades = ["A", "B", "C", "F"];
  let ranges = ["80-100", "65-79", "50-64", "0-49"];
  let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";

  for (let i = 0; i < grades.length; i++) {
    tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
  }

  tableHTML += "</table>";
  document.getElementById("tableContainer").innerHTML = tableHTML;
}