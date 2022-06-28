import React from "react";
import style from "./CanteenBalance.module.css";
import axios from "axios";
class CanteenBalance extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${style.container}`}>
        <div className={`${style.balance} bg-dark`}>
          <span>Balance: Rp{this.props.balance}</span>
        </div>
      </div>
    );
  }
}
export default CanteenBalance;
