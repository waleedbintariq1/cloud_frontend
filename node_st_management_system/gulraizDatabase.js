const db_name = "student_info";
const password = "root";
const username = "root";
const host = "localhost";

var mysql = require("mysql2");

function getConnection() {
  // this will connect to sql server and return a
  var con = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: db_name,
  });
  return con;
}

function validateUser(email, password, callback) {
  // Recieve email and password and returns a record of student from database with that email and password
  connection = getConnection();

  sql = `Select * from student where email = '${email}' and password = '${password}'`;
  student = [];

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }

    if (results.length == 1) {
      callback(results[0]);
    } else {
      callback(student);
    }
  });
  connection.end();
}

function fetchStudentInfo(email, callback) {
  connection = getConnection();
  sql = `Select * from student where email = '${email}'`;

  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }

    if (results.length == 1) {
      callback(results[0]);
    } else {
      callback(student);
    }
  });
  connection.end();
}

function registerUser(userInfo) {
  // Receives user credentials from front end and stores data in backend
  connection = getConnection();

  let rollNum = userInfo.email.substring(0, 6);
  sql = `INSERT INTO Student (roll_no, name, email, password, phone_no) VALUES('${rollNum}', '${userInfo.full_name}', '${userInfo.email}', '${userInfo.password}', '${userInfo.phone_no}')`;

  connection.query(sql, (error) => {
    if (error) {
      return console.error(error.message);
    }
  });
  connection.end();
}

function displayRegisteredCourses(email, callback) {
  //establish connection
  connection = getConnection();

  //write sql query
  sql = `select course.course_id, course_name, section
  from student
  join student_course on student.roll_no = student_course.student_id
  join course on course.course_id = student_course.course_id
  where email = '${email}'`;

  //execute sql query and handle results
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }

    if (results.length >= 1) {
      callback(results);
    }
  });

  connection.end();
}

function getAvailableCourses(email, callback) {
  connection = getConnection();

  //following is just placeholder query for now
  //correct query will be written when gulraiz adds sections to database
  //right now only those sections are provided in which students have already registered
  sql = `select distinct(course.course_id), course_name, section
  from course
  left join student_course  on student_course.course_id = course.course_id`;

  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    if (results.length >= 1) {
      callback(results);
    }
  });
  connection.end();
}

function getStudentRollNum(email, callback) {
  connection = getConnection();

  sql = `SELECT roll_no FROM student WHERE email='${email}'`;
  connection.query(sql, (error, results) => {
    if (error) {
      return console.error(error.message);
    }

    if (results.length == 1) {
      callback(results[0]);
    } else {
      callback(null);
    }
  });

  connection.end();
}

function postStudentRegisteredCourses(email, rollNum, registeredCourses) {
  connection = getConnection();

  //inserting courses into database
  for (let i = 0; i < registeredCourses.length; i++) {
    sql = `INSERT INTO Student_Course VALUES ('${rollNum}', '${registeredCourses[i].course_id}', '${registeredCourses[i].section}')`;
    connection.query(sql, (error) => {
      if (error) {
        return console.error(error.message);
      }
    });
  }

  connection.end();
}

module.exports = {
  validateUser,
  fetchStudentInfo,
  registerUser,
  displayRegisteredCourses,
  getAvailableCourses,
  getStudentRollNum,
  postStudentRegisteredCourses,
};
