import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Store from "./pages/Store/Store";
import SellForm from "./pages/SellForm/SellForm";
import SignForm from "./pages/SignForm/SignForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

/**
 * TODO
 * 1.Sidebar bug after login
 * 2.Log out button
 * 3.Upload image product fiture
 * 4.Add balance without buy product
 * 5.Withdraw without add product
 * 6.Refactoring code
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canteenBalance: null, isLogin: false, user: null };
    this.updateUser = this.updateUser.bind(this);
  }

  componentDidMount() {
    this.getCanteenBalance();
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
            <Sidebar user={this.state.user} />
            <Routes>
              <Route
                exact
                path="/sell-form"
                element={
                  <SellForm
                    balance={this.state.canteenBalance}
                    getBalance={this.getCanteenBalance.bind(this)}
                  />
                }
              ></Route>
              <Route
                exact
                path="/user/*"
                element={<SignForm onUpdateUser={this.updateUser} />}
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
