import axios from "axios";
import React from "react";
import Input from "./Input";
import Modal from "./Modal";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnLoginProgress: false,
      isValid: false,
      studentID: "",
      password: "",
      modal: { showModal: false, message: "", alertType: "" },
    };
    this.inputChangeHandle = this.inputChangeHandle.bind(this);
    this.loginHandler = this.loginHandler.bind(this);
    this.alert = this.alert.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  inputChangeHandle(e) {
    const elementID = e.target.id;
    const value = e.target.value;
    if (elementID === "studentID") this.setState({ studentID: value });
    if (elementID === "password") this.setState({ password: value });
  }

  alert(isValid, message, alertType) {
    this.setState({
      isOnLoginProgress: false,
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
      this.props.setActiveNav("store");
    } else {
      this.alert(false, "Invalid student ID or password", "alert-danger");
    }
  }

  closeModal() {
    this.setState({ studentID: "", password: "", modal: { showModal: false } });
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
            onRemoveSpinner={this.removeSpinner}
          />
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onInputChange={this.inputChangeHandle}
            onRemoveSpinner={this.removeSpinner}
          />
          <button
            type="submit"
            className="btn btn-primary w-25"
            onClick={() => this.setState({ isOnLoginProgress: true })}
          >
            {this.state.isOnLoginProgress ? (
              <div class="spinner-border spinner-border-sm" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <Modal
          showModal={this.state.modal.showModal}
          message={this.state.modal.message}
          alertType={this.state.modal.alertType}
          isValid={this.state.isValid}
          onCloseModal={this.closeModal}
        />
      </>
    );
  }
}

export default SignIn;
