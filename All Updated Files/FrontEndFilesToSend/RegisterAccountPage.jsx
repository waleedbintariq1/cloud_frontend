import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import {
  GetProjects,
  VerifyLogin,
  RegisterAccount,
  FetchStudentRemainingInfo,
  PostStudentRegisteredCourses,
} from "./RESTAPI_CALLER";

class RegisterAccountClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roll_no: "",
      full_name: "",
      email: "",
      password: "",
      phone_no: "",
    };
  }
  render() {
    return (
      <RegisterAccountFunc
        current_full_name={this.state.full_name}
        current_email={this.state.email}
        current_password={this.state.password}
        current_phone_no={this.state.phone_no}
        current_full_name_func={(rec_full_name) => {
          this.setState({ full_name: rec_full_name });
        }}
        current_email_func={(rec_email) => {
          this.setState({ email: rec_email });
        }}
        current_password_func={(rec_password) => {
          this.setState({ password: rec_password });
        }}
        current_phone_no_func={(rec_phone_no) => {
          this.setState({ phone_no: rec_phone_no });
        }}
      ></RegisterAccountFunc>
    );
  }
}

function RegisterAccountFunc(params) {
  let history = useHistory();
  return (
    <div className="div_SignUp_SecondPage_Main">
      <div className="div_uppest_signUp_upwork">
        <div className="div_inside_uppest_signUp_upwork">
          <img
            className="img_upwork_sign_up_image"
            src="Images/student_course_management_system.PNG"
          />
        </div>
      </div>

      <div className="div_SignUp_second_page_second_main">
        <div className="div_SignUp_second_page_card_holder">
          <div className="div_Complete_your_free_account_setup">
            Complete your free account
          </div>
          <div className="div_setup">setup</div>

          <div className="div_create_a_password">
            <input
              className="input_create_a_password"
              type="input"
              placeholder=" Enter Full Name Here"
              value={params.current_full_name}
              onChange={(event) => {
                params.current_full_name_func(event.target.value);
                // this.setState({ email: event.target.value });
              }}
            ></input>
          </div>

          <div className="div_create_a_password">
            <input
              className="input_create_a_password"
              type="input"
              placeholder=" Enter Email Here"
              value={params.current_email}
              onChange={(event) => {
                params.current_email_func(event.target.value);
                // this.setState({ email: event.target.value });
              }}
            ></input>
          </div>

          <div className="div_create_a_password">
            <input
              className="input_create_a_password"
              type="password"
              placeholder=" Create a password"
              value={params.current_password}
              onChange={(event) => {
                params.current_password_func(event.target.value);
                // this.setState({ password: event.target.value });
              }}
            ></input>
          </div>

          <div className="div_select_a_country">
            <input
              className="input_select_a_country"
              type="input"
              placeholder=" Enter Phone No Here"
              value={params.current_phone_no}
              onChange={(event) => {
                params.current_phone_no_func(event.target.value);
                // this.setState({ country: event.target.value });
              }}
            ></input>
          </div>

          <button
            className="button_create_my_account"
            onClick={() => {
              //   alert("on click of button is spoken");
              RegisterAccount({
                full_name: params.current_full_name,
                email: params.current_email,
                password: params.current_password,
                phone_no: params.current_phone_no,
              }).then((response) => {
                console.log(response.data);
                // alert(response.data);
                history.push("/");
              });
            }}
          >
            Create My Account
          </button>
        </div>
      </div>

      <div className="div_third_Main_as_footer">
        <div className="div_for_015_2021_Upwork_Global_Inc">
          © 2015 - 2021 Upwork® Global Inc
        </div>
        <div className="div_for_terms_for_service">Terms for Service</div>
        <div className="div_for_Privacy_Policy">Privacy Policy</div>
        <div className="div_for_Accesibility">Accessibility</div>
      </div>
    </div>
  );
}

export default RegisterAccountClass;
