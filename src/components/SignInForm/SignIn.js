import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
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
  }

  inputChangeHandle(e) {
    const elementID = e.target.id;
    const value = e.target.value;
    if (elementID === "studentID") this.setState({ studentID: value });
    if (elementID === "password") this.setState({ password: value });
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
      console.log(this.props);
      this.props.onUpdateUser(users[validUserIdx]);
      this.setState({
        isValid: true,
        modal: {
          showModal: true,
          message: "Login success",
          alertType: "alert-success",
        },
      });
    } else {
      this.setState({
        modal: {
          isValid: false,
          showModal: true,
          message: "Invalid student ID or password",
          alertType: "alert-danger",
        },
      });
    }
  }

  render() {
    return (
      <>
        <form className="text-black" onSubmit={this.loginHandler}>
          <div className="form-group mb-2">
            <label>Student ID</label>
            <input
              id="studentID"
              type="text"
              className="form-control"
              placeholder="Enter student ID"
              value={this.state.studentID}
              onChange={this.inputChangeHandle}
            ></input>
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
            ></input>
          </div>
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
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() =>
                    this.setState({
                      studentID: "",
                      password: "",
                      modal: { showModal: false },
                    })
                  }
                ></button>
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
