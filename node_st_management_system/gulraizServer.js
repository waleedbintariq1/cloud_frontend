const expressModule = require("express");
const database = require("./gulraizDatabase.js");
const cors = require("cors");
const app = expressModule();

app.options("/verifyloginaccount", cors());
app.options("/registerAccount", cors());
app.options("/fetchremainingstudentinfo", cors());
app.options("/PostStudentRegisteredCourses", cors());
app.options("/displayregisteredcourses", cors());
app.options("/getAvailableCourses", cors());
app.options("/postStudentRegisteredCourses", cors());

var student = [];

// file module
const fs = require("fs");
const { createSecretKey } = require("crypto");

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

  database.validateUser(req_email, req_password, function (result) {
    if (result.length == 0) {
      response.send(false);
    } else {
      student = {
        full_name: result.name,
        id: result.roll_no,
        email: result.email,
        password: result.password,
        phone_no: result.phone_no,
        cgpa: result.cgpa,
      };

      response.send(true);
    }
  });
});

app.post("/fetchremainingstudentinfo", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside fetch remaining student info server");

  const email = req.body.email;
  const password = req.body.password;

  database.fetchStudentInfo(email, function (result) {
    if (result.length == 0) {
      res.send(false);
    } else {
      student = {
        full_name: result.name,
        id: result.roll_no,
        email: result.email,
        password: result.password,
        phone_no: result.phone_no,
        cgpa: result.cgpa,
      };
    }
  });
  res.send(student);
});

//Waleed Code
app.post("/registerAccount", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside register account server");

  // storing object that came from axios function
  let userInfo = req.body;

  database.registerUser(userInfo);
});

app.post("/displayregisteredcourses", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside get registered courses server");

  let email = req.body.email;
  let courseList = [];

  database.displayRegisteredCourses(email, function (result) {
    if (result.length == 0) {
      console.log("results == 0");
      res.send(false);
    } else {
      for (let i = 0; i < result.length; i++) {
        courseList.push(result[i]);
      }

      res.send(courseList);
    }
  });
});

app.post("/getAvailableCourses", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside get available courses server");

  const email = req.body.email;
  let courseList = [];

  database.getAvailableCourses(email, function (result) {
    if (result.length == 0) {
      console.log("No courses available");
      res.send(false);
    } else {
      for (let i = 0; i < result.length; i++) {
        courseList.push(result[i]);
      }
      res.send(courseList);
    }
  });
});

app.post("/postStudentRegisteredCourses", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  console.log("inside post student registered courses server");

  const email = req.body.email;
  const registeredCourses = req.body.registeredCourses;

  let rollNum;

  database.getStudentRollNum(email, function (result) {
    if (result.length == 0) {
      res.send(false);
    } else if (result != null) {
      rollNum = result.roll_no;
      database.postStudentRegisteredCourses(email, rollNum, registeredCourses);
    }
  });
});
