import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Store from "./pages/Store/Store";
import SellForm from "./pages/SellForm/SellForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import moment from "moment";
import "moment/locale/id";

// SET LOCALE ID MOMENT.JS
moment.locale("id");

/**
 * TODO
 * Convert SQL DateTime to Javascript Date Object
 */
class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <div className="App container-fluid">
          <div className="row flex-nowrap">
            <Sidebar />
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
