import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import {
  GetProjects,
  VerifyLogin,
  RegisterAccount,
  FetchStudentRemainingInfo,
  PostStudentRegisteredCourses,
} from "./RESTAPI_CALLER";

class StLoginAccountMainPageClass extends Component {
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
    };
  }
  render() {
    return (
      <div className="div_main_StLoginAccountMainPageClass">
        <div className="div_uppest_signUp_upwork">
          <div className="div_inside_uppest_signUp_upwork div_for_st_course_management_system_and_username">
            <img
              className="img_upwork_sign_up_image"
              src="Images/student_course_management_system.PNG"
            />
            <div className="div_username_and_logOut">
              <div className="div_for_username">
                {" "}
                {this.state.student.username}
              </div>
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
              onClick={(abc) => {}}
              style={{
                boxShadow: "7px 7px 7px 7px limegreen",
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
              onClick={(abc) => {
                const dataa = {
                  email: this.state.student.email,
                  password: this.state.student.password,
                };
                this.props.history.push({
                  pathname: "/displayregisteredcourses",
                  state: dataa, // your data array of objects
                });
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
                src="Images/student_profile_home.PNG"
              />
            </div>
            <div className="div_personal_info_card">
              <div className="div_label_personal_info">
                Personal Information
              </div>
              <div className="div_actual_personal_info">
                <div className="div_roll_no_and_email">
                  <div className="div_roll_no_and_label">
                    <div className="div_label_roll_no">Roll No:</div>
                    <div className="div_roll_no">
                      {this.state.student.roll_no}
                    </div>
                  </div>

                  <div className="div_email_and_label">
                    <div className="div_label_email">Email:</div>
                    <div className="div_email">{this.state.student.email}</div>
                  </div>
                </div>

                <div className="div_username_and_deparmtment">
                  <div className="div_username_and_label">
                    <div className="div_label_username">Name:</div>
                    <div className="div_username">
                      {this.state.student.username}
                    </div>
                  </div>

                  <div className="div_department_and_label">
                    <div className="div_label_department">Department:</div>
                    <div className="div_department">
                      {this.state.student.department}
                    </div>
                  </div>
                </div>

                <div className="div_cgpa_and_phone_no">
                  <div className="div_cpga_and_label">
                    <div className="div_label_cgpa">CGPA:</div>
                    <div className="div_cgpa">{this.state.student.cgpa}</div>
                  </div>

                  <div className="div_phone_no_and_label">
                    <div className="div_label_phone_no">Phone No:</div>
                    <div className="div_phone_no">
                      {this.state.student.phone_no}
                    </div>
                  </div>
                </div>
              </div>
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
        username: response.data.name,
        roll_no: response.data.roll_no,
        email: response.data.email,
        password: response.data.password,
        phone_no: response.data.phone_no,
        department: response.data.department,
        cgpa: response.data.cgpa,
      };

      this.setState({
        student: newStudent,
      });
    });
  }
}

export default withRouter(StLoginAccountMainPageClass);
