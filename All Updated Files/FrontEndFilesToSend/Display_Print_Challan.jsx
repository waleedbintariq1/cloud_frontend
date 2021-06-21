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

class DiplayPrintChallanClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      roll_no: "",
      username: "",
      password: "",
      phone_no: "",
      amount: "",
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
              onClick={(abc) => {
                const dataa = {
                  email: this.state.email,
                  password: this.state.password,
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
              onClick={(abc) => {}}
              style={{
                boxShadow: "7px 7px 7px 7px limegreen",
              }}
            >
              Fee Challan
            </button>
          </div>
          <div className="div_right_StLoginAccountMainPageClass">
            <div className="div_student_profile_home">
              <img
                className="img_student_fee_challan"
                src="Images/Fee_Challan.PNG"
              />
            </div>

            <div className="div_courses_info_card">
              <div className="div_label_courses_info  ">
                Challan Information
              </div>
              <div className=" div_to_hold_one_course_info_label div_challan_info ">
                <div className="div_Course_ID_label ">Amount</div>
                <div className="div_Course_Name_label">Generated On</div>
                <div className="div_Course_section_label">Due Date</div>
                <div className="div_credithours">Status</div>
              </div>
              <div className="div_actual_challan_info">
                <div className="div_actual_amount">{this.state.amount}</div>
                <div className="div_actual_generated_on">10-10-2010</div>
                <div className="div_sctual_due_date">20-10-2010</div>
                <div className="div_actual_status">Paid</div>
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
    }).then((response) => {
      console.log(response.data);
      //   alert(response.data);

      this.setState({
        username: response.data.full_name,
        roll_no: response.data.id,
        email: response.data.email,
        password: response.data.password,
        phone_no: response.data.phone_no,
      });
      //   history.push("/LogInPage");
    });

    DisplayRegisteredCourses({ email: this.props.location.state.email }).then(
      (response) => {
        console.log(response.data);
        var received_no_of_registeres_courses = response.data.length;
        received_no_of_registeres_courses =
          received_no_of_registeres_courses.toString();
        let current_registered_courses = Number(
          received_no_of_registeres_courses
        );
        let current_amount = current_registered_courses * 10000;
        current_amount = current_amount.toString();

        this.setState({
          amount: current_amount,
        });
      }
    );
  }
}

export default withRouter(DiplayPrintChallanClass);
