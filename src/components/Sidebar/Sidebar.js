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
    this.setActiveNav = this.setActiveNav.bind(this);
  }

  componentDidMount() {
    // set activeNav
    this.setActiveNav();

    // callback to change logout button view
    fn = this.logoutButtonView.bind(this);
    window.addEventListener("resize", fn);
  }

  setActiveNav() {
    // find current path & set activeNav
    const path = window.location.pathname.slice(1);
    const idx = path.indexOf("/");
    if (idx < 0) {
      this.setState({ activeNav: path });
    } else {
      this.setState({ activeNav: path.slice(0, idx) });
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", fn);
  }

  activeNavHandler(e) {
    const newActiveNav = e.target.closest("a").classList[0];
    if (newActiveNav === "store") this.setState({ activeNav: "store" });
    if (newActiveNav === "sell-form") this.setState({ activeNav: "sell-form" });
    if (newActiveNav === "user") this.setState({ activeNav: "user" });
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
                this.state.activeNav === "store" ? style.active : ""
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
                  this.state.activeNav === "sell-form" ? style.active : ""
                }`}
              >
                <Link to="/sell-form" className="sell-form">
                  <i className="sell-Form fs-4 fa-solid fa-circle-plus"></i>
                  <span className="ms-3 ps-1 d-none d-sm-inline">
                    Sell Item
                  </span>
                </Link>
              </li>
            ) : null}

            {!this.props.user ? (
              <li
                className={`${style.navItem} ${style.user} ${
                  this.state.activeNav === "user" ? style.active : ""
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
            this.state.activeNav === "store") ? (
            <div className={`${style.user_logout_container} text-center`}>
              <button onClick={() => this.props.updateUser(null)}>
                Log Out
              </button>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

export default Sidebar;
