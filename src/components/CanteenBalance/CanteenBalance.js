import React from "react";
import AddBalanceForm from "../AddBalanceForm/AddBalanceForm";
import style from "./CanteenBalance.module.css";
import WithdrawBalanceForm from "../WithdrawBalanceForm/WithdrawBalanceForm";
import axios from "axios";
class CanteenBalance extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showOption: false, addBalanceValue: "" };
    this.onHoverHandler = this.onHoverHandler.bind(this);
    this.onLeaveHandler = this.onLeaveHandler.bind(this);
  }

  onHoverHandler(e) {
    this.setState({ showOption: true });
  }

  onLeaveHandler(e) {
    this.setState({ showOption: false });
  }

  render() {
    return (
      <>
        <div className={`${style.container}`}>
          <div onMouseLeave={this.onLeaveHandler} className="pb-2">
            <div
              className={`${style.balance_wrapper} bg-dark`}
              onMouseEnter={this.onHoverHandler}
            >
              <div className="balance">
                <span>Balance: Rp{this.props.balance}</span>
              </div>
              <div
                className={`${style.balance_option} bg-dark ${
                  this.state.showOption ? "" : "d-none"
                }`}
              >
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#addBalanceModal"
                >
                  Add
                </button>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#withdrawBalanceModal"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* MODAL */}
        <AddBalanceForm
          balance={this.props.balance}
          getBalance={this.props.getBalance}
        />
        <WithdrawBalanceForm
          balance={this.props.balance}
          getBalance={this.props.getBalance}
        />
      </>
    );
  }
}
export default CanteenBalance;
