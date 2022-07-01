import style from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import React from "react";
import { SMALL } from "../../Config";

let fn;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeNav: null, sm: true };
    this.activeNavHandler = this.activeNavHandler.bind(this);
  }

  componentDidMount() {
    this.props.setActiveNav();
    // callback to change logout button view
    fn = this.logoutButtonView.bind(this);
    window.addEventListener("resize", fn);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", fn);
  }

  activeNavHandler(e) {
    // const newActiveNav = e.target.closest("a").classList[0];
    // if (newActiveNav === "store") this.props.setActiveNav();
    // if (newActiveNav === "sell-form") this.props.setActiveNav();
    // if (newActiveNav === "user") this.props.setActiveNav();
    this.props.setActiveNav();
  }

  logoutButtonView(e) {
    if (SMALL.matches) this.setState({ sm: true });
    else this.setState({ sm: false });
  }

  render() {
    return (
      <div
        className={`${style.sidebar} bg-dark col-md-3 col-xl-2 col-2 w-auto p-0`}
      >
        <div className="d-flex flex-column min-vh-100 p-sm-3 align-items-center align-items-sm-start">
          <p className="mb-4">
            <span className="d-none d-sm-inline">Kantin Kejujuran</span>
          </p>
          <ul onClick={this.activeNavHandler} className={`${style.navList}`}>
            <li
              className={`${style.navItem} ${
                this.props.activeNav === "store" ? style.active : ""
              }`}
            >
              <Link to="/store" className={`store`}>
                <i className="store fs-4 fa-solid fa-store"></i>
                <span className="ms-3 d-none d-sm-inline">Store</span>
              </Link>
            </li>

            {this.props.user ? (
              <li
                className={`${style.navItem} ${
                  this.props.activeNav === "sell-form" ? style.active : ""
                }`}
              >
                <Link to="/sell-form" className="sell-form">
                  <i className="sell-form fs-4 fa-solid fa-circle-plus"></i>
                  <span className="ms-3 ps-1 d-none d-sm-inline">
                    Sell Item
                  </span>
                </Link>
              </li>
            ) : null}

            {!this.props.user ? (
              <li
                className={`${style.navItem} ${style.user} ${
                  this.props.activeNav === "user" ? style.active : ""
                }`}
              >
                <Link
                  to="/user/sign-up"
                  className="user d-flex align-items-center gap-4 ms-1"
                >
                  <i className="fa-solid fa-user-large"></i>
                  <span className="d-none d-sm-inline">User</span>
                </Link>
              </li>
            ) : null}
          </ul>
          {(this.props.user && this.state.sm) ||
          (this.props.user &&
            !this.state.sm &&
            this.props.activeNav === "store") ? (
            <div className={`${style.user_logout_container} text-center`}>
              <Link to="/store">
                <button
                  onClick={() => {
                    this.props.updateUser(null);
                    this.props.setActiveNav("store");
                  }}
                >
                  Log Out
                </button>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Sidebar;
