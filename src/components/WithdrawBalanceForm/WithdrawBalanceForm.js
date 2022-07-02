import React from "react";
import axios from "axios";
class WithdrawBalanceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      withdrawBalanceValue: "",
      isValid: false,
      alert: { isAlert: false, message: "", type: "" },
    };
    this.addBalanceChangeHandler = this.addBalanceChangeHandler.bind(this);
    this.addBalanceHandler = this.addBalanceHandler.bind(this);
    this.alert = this.alert.bind(this);
  }

  addBalanceChangeHandler(e) {
    this.setState({ withdrawBalanceValue: e.target.value });
  }

  alert(isValid, message, alertType) {
    this.setState({
      isValid: isValid,
      alert: { isAlert: true, message: message, type: alertType },
    });
  }

  async addBalanceHandler(e) {
    // user doesn't enter price
    if (this.state.withdrawBalanceValue === "") {
      this.alert(false, "Please input some number", "alert-danger");
      return;
    }

    // price input not number
    if (
      !+this.state.withdrawBalanceValue ||
      +this.state.withdrawBalanceValue < 0
    ) {
      this.alert(
        false,
        "your choosen withdraw must a number & more than 0",
        "alert-danger"
      );
      return;
    }

    if (+this.props.balance < +this.state.withdrawBalanceValue) {
      this.alert(
        false,
        "Current balance not enough to withdraw",
        "alert-danger"
      );
      return;
    }

    // add current balance and added balance
    const newBalance = +this.props.balance - +this.state.withdrawBalanceValue;

    // // update balance in database
    await axios.patch("http://localhost:5000/canteen-balance/1", {
      balance: newBalance,
    });

    // success add balance
    this.alert(true, "Withdraw success", "alert-success");
  }

  render() {
    const alert = (
      <div class={`alert ${this.state.alert.type} text-center`} role="alert">
        {this.state.alert.message}
      </div>
    );

    const form = (
      <form className="text-black p-0 m-0">
        <div className="mb-3">
          <label htmlFor="recipient-name" className="col-form-label">
            How much ?
          </label>
          <input
            type="text"
            className="form-control"
            id="recipient-name"
            value={this.state.addBalanceValue}
            onChange={this.addBalanceChangeHandler}
          ></input>
        </div>
      </form>
    );

    const cancelBtn = (
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-dismiss="modal"
      >
        Cancel
      </button>
    );

    const withdrawBtn = (
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.addBalanceHandler}
      >
        Withdraw
      </button>
    );

    const okBtn = (
      <button
        type="button"
        className="btn btn-primary"
        data-bs-dismiss="modal"
        onClick={() => {
          this.props.getBalance();
          this.setState({ isValid: false, alert: { isAlert: false } });
        }}
      >
        OK
      </button>
    );

    return (
      <div
        className="modal fade"
        id="withdrawBalanceModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Withdraw balance
              </h5>
            </div>
            <div className="modal-body">
              {this.state.alert.isAlert ? alert : null}
              {!this.state.isValid ? form : null}
            </div>
            <div className="modal-footer">
              {!this.state.isValid ? (
                <>
                  {cancelBtn}
                  {withdrawBtn}
                </>
              ) : (
                [okBtn]
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WithdrawBalanceForm;
