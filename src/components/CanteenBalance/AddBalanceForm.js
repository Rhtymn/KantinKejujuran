import React from "react";
import axios from "axios";
class AddBalanceForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addBalanceValue: "",
      isValid: false,
      alert: { isAlert: false, message: "", type: "" },
    };
    this.addBalanceChangeHandler = this.addBalanceChangeHandler.bind(this);
    this.addBalanceHandler = this.addBalanceHandler.bind(this);
    this.alert = this.alert.bind(this);
  }

  addBalanceChangeHandler(e) {
    this.setState({ addBalanceValue: e.target.value });
  }

  alert(isValid, message, alertType) {
    this.setState({
      addBalanceValue: "",
      isValid: isValid,
      alert: { isAlert: true, message: message, type: alertType },
    });
  }

  async addBalanceHandler(e) {
    // user doesn't enter price
    if (this.state.addBalanceValue === "") {
      this.alert(false, "Please input some number", "alert-danger");
      return;
    }

    // price input not number
    if (!+this.state.addBalanceValue || +this.state.addBalanceValue < 0) {
      this.alert(
        false,
        "your choosen add balance must a number & more than 0",
        "alert-danger"
      );
      return;
    }

    // add current balance and added balance
    const newBalance = +this.props.balance + +this.state.addBalanceValue;

    // // update balance in database
    await axios.patch("http://localhost:5000/canteen-balance/1", {
      balance: newBalance,
    });

    // success add balance
    this.alert(true, "Added balance success", "alert-success");
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
          <label className="col-form-label">How much ?</label>
          <input
            type="text"
            className="form-control"
            value={this.state.addBalanceValue}
            onChange={this.addBalanceChangeHandler}
          ></input>
        </div>
      </form>
    );

    const addBtn = (
      <button
        type="button"
        className="btn btn-primary"
        onClick={this.addBalanceHandler}
      >
        Add
      </button>
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

    const okBtn = (
      <button
        type="button"
        className="btn btn-primary"
        data-bs-dismiss="modal"
        onClick={() => {
          this.props.getBalance();
          this.setState({
            isValid: false,
            alert: { isAlert: false },
          });
        }}
      >
        OK
      </button>
    );

    return (
      <div
        className="modal fade"
        id="addBalanceModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Add balance
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {this.state.alert.isAlert ? alert : null}
              {!this.state.isValid ? form : null}
            </div>
            <div className="modal-footer">
              {!this.state.isValid ? (
                <>
                  {cancelBtn}
                  {addBtn}
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

export default AddBalanceForm;
