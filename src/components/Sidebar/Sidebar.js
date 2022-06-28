import style from "./Sidebar.module.css";
import { Link } from "react-router-dom";
import React from "react";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeNav: "store" };
  }
  render() {
    const activeNavHandler = (e) => {
      const newActiveNav = e.target.closest("a").classList[0];
      if (newActiveNav === "store") this.setState({ activeNav: "store" });
      if (newActiveNav === "sellForm") this.setState({ activeNav: "sellForm" });
    };

    return (
      <div
        className={`${style.sidebar} bg-dark col-md-3 col-xl-2 col-2 w-auto p-0`}
      >
        <div className="d-flex flex-column min-vh-100 p-sm-3 align-items-center align-items-sm-start">
          <p className="mb-4">
            <span className="d-none d-sm-inline">Kantin Kejujuran</span>
          </p>
          <ul onClick={activeNavHandler} className={`${style.navList}`}>
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

            <li
              className={`${style.navItem} ${
                this.state.activeNav === "sellForm" ? style.active : ""
              }`}
            >
              <Link to="/sell-form" className="sellForm">
                <i className="sellForm fs-4 fa-solid fa-circle-plus"></i>
                <span className="ms-3 d-none d-sm-inline">Sell Item</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
