import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Store from "./pages/Store/Store";
import SellForm from "./pages/SellForm/SellForm";
import CanteenBalance from "./components/CanteenBalance/CanteenBalance";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

/**
 * TODO
 * Implements Buy Fiture
 */
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { canteenBalance: null };
  }

  getCanteenBalance(balance) {
    this.setState({ canteenBalance: balance });
    console.log(this.state.canteenBalance);
  }

  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <div className="row flex-nowrap">
            <Sidebar />
            <CanteenBalance sendBalance={this.getCanteenBalance.bind(this)} />
            <Routes>
              <Route exact path="/sell-form" element={<SellForm />}></Route>
              <Route path="*" element={<Store />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
