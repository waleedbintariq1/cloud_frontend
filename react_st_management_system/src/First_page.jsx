import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { Route, withRouter } from "react-router-dom";
import {
  GetProjects,
  VerifyLogin,
  RegisterAccount,
  FetchStudentRemainingInfo,
  PostStudentRegisteredCourses,
} from "./RESTAPI_CALLER";

class Login_SignUP extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }
  render() {
    return (
      <div className="div_first_page_outest">
        <div className="div_left_half">
          <div>
            <div className="div_st_management_system">
              Student Course Management System
            </div>
            <div className="div_main_card">
              <div className="div_const_login">Log In</div>
              <div className="div_for_form ">
                <form>
                  <i className="fas fa-user user_icon"></i>

                  <input
                    className="input_email"
                    type="input"
                    placeholder="Enter Your Email Here"
                    value={this.state.email}
                    onChange={(event) => {
                      console.log("aa == " + event.target.value);
                      // params.current_email_func(event.target.value);
                      this.setState({ email: event.target.value });
                    }}
                  ></input>
                </form>
              </div>
              <div className="div_for_password_form ">
                <form>
                  <i class="fas fa-unlock password_icon"></i>
                  <input
                    className="input_password"
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(event) => {
                      // params.current_password_func(event.target.value);
                      this.setState({ password: event.target.value });
                    }}
                  ></input>
                </form>
              </div>
              <div className="div_forget_password">Forget Password ?</div>
              <button
                className="button_login"
                onClick={() => {
                  VerifyLogin({
                    email: this.state.email,
                    password: this.state.password,
                  }).then((response) => {
                    console.log(response.data);
                    // alert(response.data);

                    if (response.data) {
                      const dataa = {
                        // student: this.state.student,
                        email: this.state.email,
                        password: this.state.password,
                      };
                      this.props.history.push({
                        pathname: "/loginedAccount",
                        state: dataa, // your data array of objects
                      });
                    } else {
                      alert("Email or Password is wrong");
                    }

                    //   history.push("/LogInPage");
                  });
                }}
              >
                {" "}
                Log In{" "}
              </button>
            </div>
          </div>

          <Register_Account></Register_Account>
        </div>
        <div className="div_right_half">
          <img
            className="img_courses_in_library"
            src="Images/courses_in_library.JPG"
          />
        </div>
      </div>
    );
  }
}

function Login(params) {
  let history = useHistory();
  return (
    <div>
      <div className="div_st_management_system">
        Student Course Management System
      </div>
      <div className="div_main_card">
        <div className="div_const_login">Log In</div>
        <div className="div_for_form ">
          <form>
            <i className="fas fa-user user_icon"></i>

            <input
              className="input_email"
              type="input"
              placeholder="Enter Your Email Here"
              value={params.current_email}
              onChange={(event) => {
                params.current_email_func(event.target.value);
                // this.setState({ email: event.target.value });
              }}
            ></input>
          </form>
        </div>
        <div className="div_for_password_form ">
          <form>
            <i class="fas fa-unlock password_icon"></i>
            <input
              className="input_password"
              type="password"
              placeholder="Password"
              value={params.current_password}
              onChange={(event) => {
                params.current_password_func(event.target.value);
                // this.setState({ email: event.target.value });
              }}
            ></input>
          </form>
        </div>
        <div className="div_forget_password">Forget Password ?</div>
        <button
          className="button_login"
          onClick={() => {
            VerifyLogin({
              email: params.current_email,
              password: params.current_password,
            }).then((response) => {
              console.log(response.data);
              // alert(response.data);

              if (response.data) {
                const dataa = [
                  {
                    email: params.current_email,
                    password: params.current_password,
                  },
                ];
                history.push({
                  pathname: "/loginedAccount",
                  state: dataa, // your data array of objects
                });
              } else {
                alert("Email or Password is wrong");
              }

              //   history.push("/LogInPage");
            });
          }}
        >
          {" "}
          Log In{" "}
        </button>
      </div>
    </div>
  );
}

function Register_Account(params) {
  let history = useHistory();
  return (
    <div>
      <div className="div_register_account_main">Don't Have an Account?</div>
      <button
        className="button_register_account"
        onClick={() => {
          history.push("/RegisterAccount");
        }}
      >
        Register Account
      </button>
    </div>
  );
}

export default withRouter(Login_SignUP);
