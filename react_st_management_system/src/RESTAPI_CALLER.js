import axios from "axios";

function DisplayRegisteredCourses(params) {
  const emailObject = {
    email: params.email,
  };

  return axios({
    method: "POST",
    url: "http://localhost:3001/displayregisteredcourses",
    data: emailObject,
  });
}

function FetchStudentRemainingInfo(params) {
  // alert("Fetching Student remaining info function called in RestCaller Api");
  const requiredInfo = {
    email: params.email,
    password: params.password,
  };

  console.log("email: " + params.email);

  return axios({
    method: "POST",
    url: "http://localhost:3001/fetchremainingstudentinfo",
    data: requiredInfo,
  });
}

function VerifyLogin(params) {
  // alert("Verify function called in RestCaller Api");
  const new_login_account = {
    email: params.email,
    password: params.password,
  };

  return axios({
    method: "POST",
    url: "http://localhost:3001/verifyloginaccount",
    data: new_login_account,
  });
}

function RegisterAccount(params) {
  // alert("RegisterAccount function called in RestCaller Api");
  const new_register_account = {
    full_name: params.full_name,
    email: params.email,
    password: params.password,
    phone_no: params.phone_no,
  };

  return axios({
    method: "POST",
    url: "http://localhost:3001/registerAccount",
    data: new_register_account,
  });
}

function GetAvailableCourses(params) {
  const data = {
    email: params.email,
  };

  return axios({
    method: "POST",
    url: "http://localhost:3001/getAvailableCourses",
    data: data,
  });
}

function PostStudentRegisteredCourses(params) {
  const data = {
    email: params.email,
    registeredCourses: params.registeredCourses,
  };

  return axios({
    method: "POST",
    url: "http://localhost:3001/postStudentRegisteredCourses",
    data: data,
  });
}

export {
  VerifyLogin,
  RegisterAccount,
  FetchStudentRemainingInfo,
  DisplayRegisteredCourses,
  GetAvailableCourses,
  PostStudentRegisteredCourses,
};

// function PostAccout(params) {
//   alert("Post accout function called in RestCaller Api");
//   // alert(
//   //   "Posted Account Email  == " +
//   //     params.email +
//   //     "Posted Account First Name  == " +
//   //     params.first_name +
//   //     "   Posted Account last Name == " +
//   //     params.last_name +
//   //     "  Posted Account password == " +
//   //     params.password +
//   //     "   Posted Account country == " +
//   //     params.country
//   // );

//   const new_account = {
//     email: params.email,
//     first_name: params.first_name,
//     last_name: params.last_name,
//     password: params.password,
//     country: params.country,
//   };

//   return axios({
//     method: "POST",
//     url: "http://localhost:3000/addaccount",
//     data: new_account,
//   });
// }
