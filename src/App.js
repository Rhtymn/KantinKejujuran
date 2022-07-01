import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Store from "./pages/Store/Store";
import SellForm from "./pages/SellForm/SellForm";
import SignForm from "./pages/SignForm/SignForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

/**
 * TODO
 * 1.Sidebar bug after login (DONE)
 * 2.Log out button (DONE)
 * 3.Upload product image fiture
 * 4.Add balance without buy product (DONE)
 * 5.Withdraw without add product (DONE)
 * 6.Refactoring code (DONE)
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canteenBalance: null,
      isLogin: false,
      user: null,
      activeNav: null,
    };
    this.updateUser = this.updateUser.bind(this);
    this.setActiveNav = this.setActiveNav.bind(this);
  }

  componentDidMount() {
    this.getCanteenBalance();
    this.setActiveNav();
  }

  setActiveNav(newActiveNav) {
    if (newActiveNav) {
      this.setState({ activeNav: newActiveNav });
      return;
    }
    // find current path & set activeNav
    const path = window.location.pathname.slice(1);
    const idx = path.indexOf("/");
    if (idx < 0) {
      this.setState({ activeNav: path });
    } else {
      this.setState({ activeNav: path.slice(0, idx) });
    }
  }

  async getCanteenBalance() {
    const response = await axios.get("http://localhost:5000/canteen-balance");
    const balance = response.data[0].balance;
    this.setState({ canteenBalance: balance });
  }

  updateUser(user) {
    this.setState({ user: user });
  }

  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <div className="row flex-nowrap">
            <Sidebar
              user={this.state.user}
              updateUser={this.updateUser}
              activeNav={this.state.activeNav}
              setActiveNav={this.setActiveNav}
            />
            <Routes>
              <Route
                exact
                path="/sell-form"
                element={
                  <SellForm
                    balance={this.state.canteenBalance}
                    getBalance={this.getCanteenBalance.bind(this)}
                    setActiveNav={this.setActiveNav}
                  />
                }
              ></Route>
              <Route
                exact
                path="/user/*"
                element={
                  <SignForm
                    onUpdateUser={this.updateUser}
                    setActiveNav={this.setActiveNav}
                  />
                }
              ></Route>
              <Route
                path="*"
                element={
                  <Store
                    user={this.state.user}
                    balance={this.state.canteenBalance}
                    getBalance={this.getCanteenBalance.bind(this)}
                  />
                }
              ></Route>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
