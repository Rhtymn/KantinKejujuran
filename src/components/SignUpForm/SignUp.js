import axios from "axios";
import React from "react";
class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formActive: "signUp",
      studentID: "",
      password: "",
      alert: { isAlert: false, message: "", type: "" },
    };
    this.inputChangeHandle = this.inputChangeHandle.bind(this);
    this.registerFormHandler = this.registerFormHandler.bind(this);
  }

  inputChangeHandle(e) {
    const elementID = e.target.id;
    const value = e.target.value;
    if (elementID === "studentID") this.setState({ studentID: value });
    if (elementID === "password") this.setState({ password: value });
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
      this.setState({
        studentID: "",
        password: "",
        alert: {
          isAlert: true,
          message: message,
          type: "alert-danger",
        },
      });
      return;
    }

    const studentID = this.state.studentID;
    const resultID = +studentID.substring(3);
    const sumThreeDigits = studentID
      .substring(0, 3)
      .split("")
      .reduce((prev, curr) => prev + +curr, 0);

    // studentID not valid
    if (sumThreeDigits != resultID) {
      this.setState({
        studentID: "",
        password: "",
        alert: {
          isAlert: true,
          message: "student ID are not valid!",
          type: "alert-danger",
        },
      });
      return;
    }

    // studentID & password valid, send to database
    await axios.post("http://localhost:5000/users", {
      studentId: this.state.studentID,
      password: this.state.password,
    });

    this.setState({
      studentID: "",
      password: "",
      alert: {
        isAlert: true,
        message: "Register Success, Please login to continue",
        type: "alert-success",
      },
    });
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
          <div className="form-group mb-2">
            <label>Student ID</label>
            <input
              id="studentID"
              type="text"
              className="form-control"
              placeholder="Enter student ID"
              value={this.state.studentID}
              onChange={this.inputChangeHandle}
              required
            ></input>
            <small className="form-text text-muted">
              student ID consist of a 5 digits number from 0-9
            </small>
          </div>
          <div className="form-group mb-2">
            <label>Password</label>
            <input
              id="password"
              type="password"
              className="form-control"
              placeholder="Password"
              value={this.state.password}
              onChange={this.inputChangeHandle}
              required
            ></input>
            <small className="form-text text-muted">
              password length between 8-16 characters
            </small>
          </div>
          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>
      </>
    );
  }
}
export default SignUp;
