import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import {
  GetProjects,
  VerifyLogin,
  RegisterAccount,
  FetchStudentRemainingInfo,
  PostStudentRegisteredCourses,
  GetAvailableCourses,
} from "./RESTAPI_CALLER";

class RegisterCoursesClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      roll_no: "",
      username: "",
      password: "",
      phone_no: "",
      courses: [],
      iteration: 1,
      actual_courses_registered: [],
      courses_registered_boolean: [],
    };
  }
  render() {
    if (this.state.iteration === 1) {
      let dummy_courses_registered = new Array(this.state.courses.length).fill(
        false
      );
      this.setState({
        courses_registered_boolean: dummy_courses_registered,
        iteration: 2,
      });
    }

    let new_courses_array = this.state.courses.map((course) => (
      <div className="div_to_hold_one_course_info">
        <div className="div_course_id">{course.course_id}</div>
        <div className="div_course_name">{course.course_name}</div>
        <div className="div_course_section">{course.section}</div>
        <input
          className="checkbox_for_each_course"
          type="checkbox"
          defaultChecked={
            this.state.courses_registered_boolean[course.course_id]
          }
          onChange={() => {
            let new_dummy_registered_courses_array =
              this.state.courses_registered_boolean;
            new_dummy_registered_courses_array[course.coruse_id] =
              !new_dummy_registered_courses_array[course.coruse_id];

            if (new_dummy_registered_courses_array[course.coruse_id] === true) {
              let new_dummy_actual_courses_registered =
                this.state.actual_courses_registered;
              new_dummy_actual_courses_registered.push(course);

              this.setState({
                actual_courses_registered: new_dummy_actual_courses_registered,
              });
            } else {
              let new_dummy_actual_courses_registered =
                this.state.actual_courses_registered;
              //   alert(course.course_name);
              //   new_dummy_actual_courses_registered.map((course_name) => {
              //     alert("  Course_Name == " + course_name);
              //   });

              //   new_dummy_actual_courses_registered.in
              let index = new_dummy_actual_courses_registered.findIndex(
                (one_course) => one_course === course
              );

              //   alert("index == " + index);
              new_dummy_actual_courses_registered.splice(index, 1);

              this.setState({
                actual_courses_registered: new_dummy_actual_courses_registered,
              });
            }
            this.setState({
              courses_registered_boolean: new_dummy_registered_courses_array,
            });

            // alert(this.state.checked);
          }}
        />
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
              <div className="div_for_username"> {this.state.username}</div>
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
                  email: this.state.email,
                  password: this.state.password,
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
              onClick={(abc) => {}}
              style={{
                boxShadow: "7px 7px 7px 7px limegreen",
              }}
            >
              Course Registration
            </button>
            <button
              className="button_display_register_courses"
              onClick={(abc) => {
                const dataa = {
                  email: this.state.email,
                  password: this.state.password,
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
                  email: this.state.email,
                  password: this.state.password,
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
              </div>
              <div className="div_actual_course_info">{new_courses_array}</div>
            </div>
            <div className="div_button_submit_register_courses">
              <button
                className="button_submit_register_courses"
                onClick={() => {
                  PostStudentRegisteredCourses({
                    email: this.state.email,
                    registeredCourses: this.state.actual_courses_registered,
                  }).then((response) => {
                    if (response) {
                      alert(
                        "Student with Roll No: " +
                          this.state.roll_no +
                          "  , successfully registered Courses."
                      );
                    } else {
                      alert("Error while registering courses");
                    }
                  });
                }}
              >
                Submit Registered Courses
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {
    FetchStudentRemainingInfo({
      email: this.props.location.state.email,
    }).then((response) => {
      console.log(response.data);

      this.setState({
        username: response.data.full_name,
        roll_no: response.data.id,
        email: response.data.email,
        password: response.data.password,
        phone_no: response.data.phone_no,
      });
    });

    GetAvailableCourses({ email: this.props.location.state.email }).then(
      (response) => {
        const fetchedCourses = response.data;

        for (let i = 0; i < fetchedCourses.length; i++) {
          if (fetchedCourses[i].section == null) {
            fetchedCourses[i].section = "C";
          }
        }
        this.setState({ courses: fetchedCourses });
      }
    );
  }
}

export default withRouter(RegisterCoursesClass);
