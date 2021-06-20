"use strict";
const { response } = require("express");
const expressModule = require("express");
// const projects_collection = require("./MongoDB/projects");
// const signup_collection = require("./MongoDB/SignUpAccountInfo");

// const signup_model = signup_collection.SignUP_model;
// const project_model = projects_collection.Project_model;

// const fs = require("fs");

const app = expressModule();

const Joi = require("joi");
const cors = require("cors");

app.use(expressModule.json());

// const mongoose = require("mongoose");

// mongoose
//   .connect(
//     "mongodb+srv://aabdullah_waseem:Abahar12@cluster0.8iaqf.mongodb.net/UpWork?retryWrites=true&w=majority",
//     { useUnifiedTopology: true, useNewUrlParser: true }
//   )
//   .then((result) => {
//     console.log("Successfully connected to DataBase ");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
let arr_projects = "";

// project_model.find().then((result) => {
//   console.log(result);
//   console.log("Correct Result");
//   arr_projects = result;
// });
// Json file content reading_______________
// let rawdata = fs.readFileSync("data.json");
// let json_data = JSON.parse(rawdata);

// let hjj = 0;
// for (var i in json_data) hjj = hjj + 1;
// const arr_projects = json_data[i];

// ________________________________________

var student_registered_accounts = [];

const registered_accounts = [
  //   {
  //     id: 1,
  //     email: "abc@gmail.com",
  //     first_name: "Abdullah",
  //     last_name: "Dogar",
  //     password: "3287492",
  //     country: "USA",
  //   },
];

// app.options("/addaccount", cors());
app.options("/verifyloginaccount", cors());
app.options("/registerAccount", cors());
app.options("/fetchremainingstudentinfo", cors());
app.options("/PostStudentRegisteredCourses", cors());

app.get("/projects", (request, response) => {
  console.log("/projects page accessed");
  response.header("Access-Control-Allow-Origin", "*");
  response.send(arr_projects);

  // response.send(projects);
});

app.get("/getregisteredcourses", (request, response) => {
  console.log("/getregisteredcourses accessed");
  response.header("Access-Control-Allow-Origin", "*");
  response.send(student_registered_accounts);

  // response.send(projects);
});

app.post("/PostStudentRegisteredCourses", (req, response) => {
  console.log("Post method for Registering Student Courses called");
  console.log(req.body);
  console.log(
    "______________________________________________________________________"
  );
  response.header("Access-Control-Allow-Origin", "*");

  var res_registered_courses_array = req.body.student_registered_courses_array;
  student_registered_accounts = res_registered_courses_array;
  var student_roll_no = req.body.student_roll_no;
  student_roll_no = student_roll_no.toString();
  // let n_verified_account = registered_accounts.find(
  //   ({ email }) => email === req_email
  // );

  response.send(student_roll_no);
});

app.post("/fetchremainingstudentinfo", (req, response) => {
  console.log("Post method for fetching remaining info of student called");
  console.log(req.body);
  console.log(
    "______________________________________________________________________"
  );
  response.header("Access-Control-Allow-Origin", "*");

  var req_email = req.body.email;

  let n_verified_account = registered_accounts.find(
    ({ email }) => email === req_email
  );

  response.send(n_verified_account);
});

app.post("/verifyloginaccount", (req, response) => {
  console.log("Post method for login verification called");
  console.log(req.body);
  console.log(
    "______________________________________________________________________"
  );
  response.header("Access-Control-Allow-Origin", "*");

  var req_email = req.body.email;
  var req_password = req.body.password;

  //   let n_verified_account = registered_accounts.filter(
  //     ({ email }) => email === req_email
  //   );

  let index_of_matched_email = registered_accounts.findIndex(
    ({ email }) => email === req_email
  );
  if (index_of_matched_email != -1) {
    if (
      registered_accounts[index_of_matched_email].email === req_email &&
      registered_accounts[index_of_matched_email].password === req_password
    ) {
      response.send(true);
    } else {
      response.send(false);
    }
  } else {
    response.send(false);
  }
});

app.post("/registerAccount", (req, response) => {
  console.log("Post method for Registering New Account called");
  console.log("Req Body == " + req.body);
  console.log(
    "______________________________________________________________________"
  );
  response.header("Access-Control-Allow-Origin", "*");

  const new_register_account = {
    id: registered_accounts.length + 1,
    full_name: req.body.full_name,
    email: req.body.email,
    password: req.body.password,
    phone_no: req.body.phone_no,
  };
  registered_accounts.push(new_register_account);
  console.log(
    "After Registration of New Account Array Becomes == " + registered_accounts
  );
  response.send(registered_accounts);
  // var req_email = req.body.email;
  // var req_password = req.body.password;

  // signup_model.findOne(
  //   { email: req_email, password: req_password },
  //   function (err, user) {
  //     if (err) {
  //       console.log(err);
  //     }
  //     if (!user) {
  //       response.send("User Not Found in DataBase");
  //     } else {
  //       console.log("User Found IN database" + user);
  //       console.log("Login Successfull");
  //       response.send(
  //         "Login Successfull.             User Found IN database" + user
  //       );
  //     }
  //   }
  // );
});

// app.post("/addaccount", (req, response) => {
//   console.log("Post method called");
//   console.log(req.body);
//   console.log(
//     "______________________________________________________________________"
//   );
//   response.header("Access-Control-Allow-Origin", "*");

//   const new_account = new signup_model({
//     email: req.body.email,
//     first_name: req.body.first_name,
//     last_name: req.body.last_name,
//     password: req.body.password,
//     country: req.body.country,
//   });

//   new_account
//     .save()
//     .then((result) => {
//       console.log("Successfully Added the account to databse : " + result);
//       response.send("Successfully Added the account to databse : " + result);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

// function validate_project(n_project) {
//   const schema = Joi.object({
//     id: Joi.number().integer().min(1).max(50).required(),
//     title: Joi.string().min(3).max(100).alphanum().required(),
//   });

//   const result = schema.validate(n_project);

//   return result.error;
// }

app.listen(3000, () => {
  console.log("Server started: Listening at port 3000");
});
