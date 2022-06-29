import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Store from "./pages/Store/Store";
import SellForm from "./pages/SellForm/SellForm";
import SignForm from "./pages/SignForm/SignForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

/**
 * TODO
 * Fix buy product bug: move modal to store component/using window.reload
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canteenBalance: null };
  }

  componentDidMount() {
    this.getCanteenBalance();
  }

  async getCanteenBalance() {
    const response = await axios.get("http://localhost:5000/canteen-balance");
    const balance = response.data[0].balance;
    this.setState({ canteenBalance: balance });
  }

  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <div className="row flex-nowrap">
            <Sidebar />
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
              <Route exact path="/user/*" element={<SignForm />}></Route>
              <Route
                path="*"
                element={
                  <Store
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
