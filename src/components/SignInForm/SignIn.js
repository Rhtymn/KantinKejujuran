import React from "react";
class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formActive: "signUp" };
  }
  render() {
    return (
      <form className="text-black">
        <div className="form-group mb-2">
          <label>Student ID</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
          ></input>
        </div>
        <div className="form-group mb-2">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
          ></input>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    );
  }
}

export default SignIn;
