const expressModule = require("express");
const cors = require("cors");
const app = expressModule();

app.options("/verifyloginaccount", cors());
app.options("/registerAccount", cors());
app.options("/fetchremainingstudentinfo", cors());
app.options("/PostStudentRegisteredCourses", cors());
app.options("/displayregisteredcourses", cors());
app.options("/getAvailableCourses", cors());
app.options("/postStudentRegisteredCourses", cors());

// file module
const fs = require("fs");
const { response } = require("express");

let jsonString = fs.readFileSync("./student.json");
const studentsArr = JSON.parse(jsonString);

jsonString = fs.readFileSync("./course.json");
const courseArr = JSON.parse(jsonString);

jsonString = fs.readFileSync("./teacher.json");
const teacherArr = JSON.parse(jsonString);

jsonString = fs.readFileSync("./department.json");
const departmentArr = JSON.parse(jsonString);

// adding midelware of json
app.use(expressModule.json());

app.listen(3001, () => {
  console.log("Server started: Listening at port 3001");
});

app.post("/verifyloginaccount", (req, response) => {
  response.header("Access-Control-Allow-Origin", "*");
  console.log("inside verify login account server");
  var req_email = req.body.email;
  var req_password = req.body.password;

  let student;
  let studentFound = false;
  for (let i = 0; i < studentsArr.length && !studentFound; i++) {
    if (
      studentsArr[i].email == req_email &&
      studentsArr[i].password == req_password
    ) {
      student = studentsArr[i];
      studentFound = true;
    }
  }

  if (studentFound) {
    response.send(true);
  } else {
    response.send(false);
  }
});

app.post("/fetchremainingstudentinfo", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside fetch remaining student info server");

  const email = req.body.email;

  let student = [];
  for (let i = 0; i < studentsArr.length; i++) {
    if (studentsArr[i].email == email) {
      student = studentsArr[i];
    }
  }

  res.send(student);
});

//Waleed Code
app.post("/registerAccount", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside register account server");

  // storing object that came from axios function
  let userInfo = req.body;

  let student = [];

  let rollNum = userInfo.email.substring(0, 6);

  student.rollNum = rollNum;
  student.name = userInfo.name;
  student.email = userInfo.email;
  student.password = userInfo.password;
  student.phone_no = userInfo.phone_no;

  studentsArr.push(student);

  res.send(studentsArr);
});

app.post("/displayregisteredcourses", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside get registered courses server");

  let email = req.body.email;
  let courseIDList = [];
  let courseList = [];

  // getting id of courses
  for (let i = 0; i < studentsArr.length; i++) {
    if (studentsArr[i].email == email) {
      courseIDList = studentsArr[i].courses;
    }
  }

  // now getting courses objects
  for (let i = 0; i < courseArr.length; i++) {
    for (let j = 0; j < courseIDList.length; j++) {
      if (courseArr[i].courseID == courseIDList[j]) {
        courseList.push(courseArr[i]);
      }
    }
  }

  res.send(courseList);
});

app.post("/getAvailableCourses", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside get available courses server");

  const email = req.body.email;
  let courseList = [];

  // get student for whom available courses need to be checked
  let student;
  let studentFound = false;
  for (let i = 0; i < studentsArr.length && !studentFound; i++) {
    if (studentsArr[i].email == email) {
      student = studentsArr[i];
      studentFound = true;
    }
  }

  // get those courses whose ID is not already present in student's courses list
  let addCourse;
  for (let i = 0; i < courseArr.length; i++) {
    addCourse = true;
    for (let j = 0; j < student.courses.length; j++) {
      if (courseArr[i].courseID == student.courses[j]) {
        addCourse = false;
      }
    }

    if (addCourse) {
      courseList.push(courseArr[i]);
    }
  }

  console.log(courseList);
  console.log(student.courses);

  res.send(courseList);
});

app.post("/postStudentRegisteredCourses", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside post student registered courses server");

  const email = req.body.email;
  const registeredCourses = req.body.registeredCourses;

  // get student for whom available courses need to be checked
  let student;
  let studentFound = false;
  for (let i = 0; i < studentsArr.length && !studentFound; i++) {
    if (studentsArr[i].email == email) {
      student = studentsArr[i];
      studentFound = true;
    }
  }

  let newCourses = [];

  // add registered course into student courses list if it is not already present (registered) there
  for (let i = 0; i < registeredCourses.length; i++) {
    for (let j = 0; j < student.courses.length; j++) {
      if (registeredCourses[i].courseID != student.courses[j]) {
        newCourses.push(registeredCourses[i]);
      }
    }
  }

  for (let i = 0; i < newCourses.length; i++) {
    student.courses.push(newCourses[i].courseID);
  }

  res.send(true);
});
