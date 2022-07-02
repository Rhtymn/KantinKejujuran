import axios from "axios";
import React from "react";
import Alert from "../Alert/Alert";
import Input from "./Input";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnRegisterProggress: false,
      formActive: "signUp",
      studentID: "",
      password: "",
      alert: { isAlert: false, message: "", type: "" },
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.registerFormHandler = this.registerFormHandler.bind(this);
    this.alert = this.alert.bind(this);
    this.isValidStudentID = this.isValidStudentID.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
  }

  inputChangeHandler(e) {
    const elementID = e.target.id;
    const value = e.target.value;
    if (elementID === "studentID") this.setState({ studentID: value });
    if (elementID === "password") this.setState({ password: value });
  }

  alert(message, alertType) {
    this.setState({
      isOnRegisterProggress: false,
      studentID: "",
      password: "",
      alert: { isAlert: true, message: message, type: alertType },
    });
  }

  removeAlert() {
    this.setState({ alert: { isAlert: false, message: "", type: "" } });
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
          <Alert
            alertType={this.state.alert.type}
            message={this.state.alert.message}
          />
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
            onRemoveAlert={this.removeAlert}
          />
          <Input
            id="password"
            label="Password"
            value={this.state.password}
            onInputChange={this.inputChangeHandler}
            hint="password length between 8-16 characters"
            placeholder="Password"
            type="password"
            onRemoveAlert={this.removeAlert}
          />
          <button
            type="submit"
            className="btn btn-primary w-25"
            onClick={() => this.setState({ isOnRegisterProggress: true })}
          >
            {this.state.isOnRegisterProggress ? (
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </>
    );
  }
}
export default SignUp;
