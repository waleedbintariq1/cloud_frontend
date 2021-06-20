import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import {
  GetProjects,
  VerifyLogin,
  RegisterAccount,
  FetchStudentRemainingInfo,
  PostStudentRegisteredCourses,
  DisplayRegisteredCourses,
} from "./RESTAPI_CALLER";

class DisplayRegisteredCoursesClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {
        email: "",
        roll_no: "",
        username: "",
        password: "",
        phone_no: "",
        cgpa: "",
        department: "",
      },
      // student: this.props.location.student,
      courseList: [],
    };
  }
  render() {
    let new_courses_array = this.state.courseList.map((course) => (
      <div className="div_to_hold_one_course_info">
        <div className="div_course_id">{course.course_id}</div>
        <div className="div_course_name">{course.course_name}</div>
        <div className="div_course_section">{course.section}</div>
        <div className="div_actual_credithours">3</div>
      </div>
    ));
    return (
      <div className="div_main_StLoginAccountMainPageClass">
        <div className="div_uppest_signUp_upwork">
          <div className="div_inside_uppest_signUp_upwork div_for_st_course_management_system_and_username">
            <img
              className="img_upwork_sign_up_image"
              src="Images/student_course_management_system.PNG"
            />
            <div className="div_username_and_logOut">
              {/* <div className="div_for_username">
                {" "}
                {this.state.student.username}
              </div> */}
              <button
                className="button_logout"
                onClick={(abc) => {
                  this.props.history.push({
                    pathname: "/",
                  });
                }}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
        <div className="div_left_and_right_each">
          <div className="div_left_StLoginAccountMainPageClass">
            <button
              className="button_home"
              onClick={(abc) => {
                const dataa = {
                  email: this.state.student.email,
                  password: this.state.student.password,
                };
                this.props.history.push({
                  pathname: "/loginedAccount",
                  state: dataa, // your data array of objects
                });
              }}
            >
              Home
            </button>
            <button
              className="button_register_courses"
              onClick={(abc) => {
                const dataa = {
                  email: this.state.student.email,
                  password: this.state.student.password,
                };
                this.props.history.push({
                  pathname: "/registercourses",
                  state: dataa, // your data array of objects
                });
              }}
            >
              Course Registration
            </button>
            <button
              className="button_display_register_courses"
              onClick={(abc) => {}}
              style={{
                boxShadow: "7px 7px 7px 7px limegreen",
              }}
            >
              Registered Courses
            </button>
            <button
              className="button_print_chalan"
              onClick={(abc) => {
                const dataa = {
                  email: this.state.student.email,
                  password: this.state.student.password,
                };
                this.props.history.push({
                  pathname: "/displayprintchalan",
                  state: dataa, // your data array of objects
                });
              }}
            >
              Fee Challan
            </button>
          </div>
          <div className="div_right_StLoginAccountMainPageClass">
            <div className="div_student_profile_home">
              <img
                className="img_student_profile_home"
                src="Images/course_registration.PNG"
              />
            </div>

            <div className="div_courses_info_card">
              <div className="div_label_courses_info">Courses Information</div>
              <div className=" div_to_hold_one_course_info_label ">
                <div className="div_Course_ID_label">Courses ID</div>
                <div className="div_Course_Name_label">Courses Name</div>
                <div className="div_Course_section_label">Courses Section</div>
                <div className="div_credithours">Credit Hours</div>
              </div>
              <div className="div_actual_course_info">{new_courses_array}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    FetchStudentRemainingInfo({
      email: this.props.location.state.email,
      pasword: this.props.location.state.password,
    }).then((response) => {
      const newStudent = {
        username: response.data.full_name,
        roll_no: response.data.id,
        email: response.data.email,
        password: response.data.password,
        phone_no: response.data.phone_no,
        department: "BSCS",
        cgpa: 3.0,
      };

      this.setState({
        student: newStudent,
      });
    });

    DisplayRegisteredCourses({
      email: this.props.location.state.email,
    }).then((response) => {
      console.log("now printing courses");
      console.log(response.data);
      this.setState({ courseList: response.data });
    });
  }
}

export default withRouter(DisplayRegisteredCoursesClass);
