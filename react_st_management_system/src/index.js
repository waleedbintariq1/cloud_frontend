import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import RegisterAccountClass from "./RegisterAccountPage";
import StLoginAccountMainPageClass from "./Student_Logined_Account_Main_Page";
import DiplayPrintChallanClass from "./Display_Print_Challan";
import DisplayRegisteredCoursesClass from "./Display_Registered_Courses";
import RegisterCoursesClass from "./Register_Courses";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/RegisterAccount" component={RegisterAccountClass} />

        <Route
          exact
          path="/loginedAccount"
          component={StLoginAccountMainPageClass}
        />
        <Route exact path="/registercourses" component={RegisterCoursesClass} />
        <Route
          exact
          path="/displayregisteredcourses"
          component={DisplayRegisteredCoursesClass}
        />
        <Route
          exact
          path="/displayprintchalan"
          component={DiplayPrintChallanClass}
        />
      </Switch>
    </Router>

    {/* <App /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
