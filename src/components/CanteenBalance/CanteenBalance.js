import React from "react";
import style from "./CanteenBalance.module.css";
import axios from "axios";
class CanteenBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { balance: null };
  }

  componentDidMount() {
    this.getCanteenBalance();
  }

  async getCanteenBalance() {
    const response = await axios("http://localhost:5000/canteen-balance");
    const balance = response.data[0].balance;
    this.setState({ balance: balance });
    this.props.sendBalance(this.state.balance);
  }

  render() {
    return (
      <div className={`${style.container}`}>
        <div className={`${style.balance} bg-dark`}>
          <span>Balance: Rp{this.state.balance}</span>
        </div>
      </div>
    );
  }
}
export default CanteenBalance;
