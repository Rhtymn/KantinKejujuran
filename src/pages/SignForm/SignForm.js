import React from "react";
import SignUp from "../../components/SignUpForm/SignUp";
import SignIn from "../../components/SignInForm/SignIn";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
class SignForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { path: null };
  }

  componentDidMount() {
    const urlPath = window.location.pathname;
    const idx = urlPath.substring(1).indexOf("/");
    const path = urlPath.slice(idx + 2);
    this.setState({ path: path });
  }

  render() {
    return (
      <div className="col">
        <ul className="nav nav-tabs mt-2 mb-2">
          <li className="nav-item">
            <Link
              to="/user/sign-up"
              className={`nav-link ${
                this.state.path === "sign-up" ? "active" : null
              }`}
              onClick={() => this.setState({ path: "sign-up" })}
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/user/sign-in"
              className={`nav-link ${
                this.state.path === "sign-in" ? "active" : null
              }`}
              onClick={() => this.setState({ path: "sign-in" })}
            >
              Sign In
            </Link>
          </li>
        </ul>
        <Routes>
          <Route
            exact
            path="/sign-up"
            element={<SignUp onUpdateUser={this.props.onUpdateUser} />}
          ></Route>
          <Route
            exact
            path="/sign-in"
            element={<SignIn onUpdateUser={this.props.onUpdateUser} />}
          ></Route>
        </Routes>
      </div>
    );
  }
}

export default SignForm;
