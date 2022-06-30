import axios from "axios";
import React from "react";
import Input from "./Input";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formActive: "signUp",
      studentID: "",
      password: "",
      alert: { isAlert: false, message: "", type: "" },
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.registerFormHandler = this.registerFormHandler.bind(this);
    this.alert = this.alert.bind(this);
    this.isValidStudentID = this.isValidStudentID.bind(this);
  }

  inputChangeHandler(e) {
    const elementID = e.target.id;
    const value = e.target.value;
    if (elementID === "studentID") this.setState({ studentID: value });
    if (elementID === "password") this.setState({ password: value });
  }

  alert(message, alertType) {
    this.setState({
      studentID: "",
      password: "",
      alert: { isAlert: true, message: message, type: alertType },
    });
  }

  isValidStudentID(studentID) {
    const resultID = +studentID.substring(3);
    const sumThreeDigits = studentID
      .substring(0, 3)
      .split("")
      .reduce((prev, curr) => prev + +curr, 0);
    return resultID === sumThreeDigits;
  }

  async registerFormHandler(e) {
    e.preventDefault();
    let message = "";
    // check studentID is 5 digits (?)
    if (this.state.studentID.length != 5) {
      message += "Please input 5 digits number student ID";
    }

    //check studentID is number (?)
    if (!+this.state.studentID) {
      if (message) {
        message += " & student ID are number!";
      } else message += "student ID are number!";
    }

    // check password length
    if (this.state.password.length < 8 || this.state.password.length > 16) {
      if (message) {
        message += " & password length must be in between 8-16 caharacters";
      } else {
        message = "password length must be in between 8-16 caharacters";
      }
    }

    // send alert if studentID input not valid
    if (message != "") {
      this.alert(message, "alert-danger");
      return;
    }

    // check is student ID valid (?)
    if (!this.isValidStudentID(this.state.studentID)) {
      this.alert("student ID is not valid!", "alert-danger");
      return;
    }

    // studentID & password valid, send to database
    await axios.post("http://localhost:5000/users", {
      studentId: this.state.studentID,
      password: this.state.password,
    });

    this.alert("Register Success, Please login to continue", "alert-success");
  }

  render() {
    return (
      <>
        {this.state.alert.isAlert ? (
          <div
            className={`alert ${this.state.alert.type} m-0 mt-2 text-center`}
            role="alert"
          >
            {this.state.alert.message}
          </div>
        ) : null}
        <form className="text-black" onSubmit={this.registerFormHandler}>
          <Input
            id="studentID"
            label="Student ID"
            value={this.state.studentID}
            onInputChange={this.inputChangeHandler}
            placeholder="Enter student ID"
            hint="student ID consist of a 5 digits number from 0-9"
            type="text"
          />
          <Input
            id="password"
            label="Password"
            value={this.state.password}
            onInputChange={this.inputChangeHandler}
            hint="password length between 8-16 characters"
            placeholder="Password"
            type="password"
          />
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </>
    );
  }
}
export default SignUp;
