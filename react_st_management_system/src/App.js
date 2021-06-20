import logo from "./logo.svg";
import "./App.css";
import Login_SignUP from "./First_page";
import "./First_page.css";
import "./RegisterAccountPage.css";
import "./Student_Logined_Account_Main_Page.css";
import "./Display_Print_Challan.css";
import "./Display_Registered_Courses.css";
import "./Register_Courses.css";
function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Login_SignUP></Login_SignUP>
    </div>
  );
}

export default App;
