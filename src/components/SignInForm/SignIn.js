import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import Input from "../SignUpForm/Input";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValid: false,
      studentID: "",
      password: "",
      modal: { showModal: false, message: "", alertType: "" },
    };
    this.inputChangeHandle = this.inputChangeHandle.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.alert = this.alert.bind(this);
  }

  inputChangeHandle(e) {
    const elementID = e.target.id;
    const value = e.target.value;
    if (elementID === "studentID") this.setState({ studentID: value });
    if (elementID === "password") this.setState({ password: value });
  }

  alert(isValid, message, alertType) {
    this.setState({
      isValid: isValid,
      modal: {
        showModal: true,
        message: message,
        alertType: alertType,
      },
    });
  }

  async loginHandler(e) {
    e.preventDefault();
    // get all users data
    const response = await axios.get("http://localhost:5000/users");
    const users = response.data;

    // validating student ID & password
    let isValid = false;
    let validUserIdx = null;
    for (let i = 0; i < users.length; i++) {
      if (users[i].studentId === this.state.studentID) {
        if (users[i].password === this.state.password) {
          isValid = true;
          validUserIdx = i;
        }
        break;
      }
    }

    if (isValid) {
      this.alert(true, "Login success", "alert-success");
      this.props.onUpdateUser(users[validUserIdx]);
    } else {
      this.alert(false, "Invalid student ID or password", "alert-danger");
    }
  }

  render() {
    return (
      <>
        <form className="text-black" onSubmit={this.loginHandler}>
          <Input
            label="Student ID"
            id="studentID"
            type="text"
            placeholder="Enter student ID"
            value={this.state.studentID}
            onInputChange={this.inputChangeHandle}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onInputChange={this.inputChangeHandle}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
        <div
          className={`modal fade ${this.state.modal.showModal ? "show" : ""}`}
          style={
            this.state.modal.showModal
              ? { display: "block" }
              : { display: "none" }
          }
          id="loginModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Login Information
                </h5>
              </div>
              <div className="modal-body">
                <div
                  className={`alert ${this.state.modal.alertType} m-0`}
                  role="alert"
                >
                  {this.state.modal.message}
                </div>
              </div>
              <div className="modal-footer">
                <Link
                  onClick={() =>
                    this.setState({
                      studentID: "",
                      password: "",
                      modal: { showModal: false },
                    })
                  }
                  to={this.state.isValid ? "/store" : "/user/sign-in"}
                >
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    OK
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default SignIn;
