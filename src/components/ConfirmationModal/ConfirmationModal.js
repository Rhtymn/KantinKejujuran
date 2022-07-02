import React from "react";
import style from "./ConfirmationModel.module.css";
class ConfirmationModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="modal fade overlay"
        id="confirmationModal"
        tabIndex="-1"
        aria-labelledby="confirmationModal"
        aria-hidden="true"
        onClick={this.props.reloadHandler}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Confirmation
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-0">
              {this.props.alert.isAlert ? (
                <div
                  className={`alert ${this.props.alert.type} m-0`}
                  role="alert"
                >
                  {this.props.alert.message}
                </div>
              ) : null}
              {!this.props.isPurchased ? (
                <form>
                  <div className={`${style["input_container"]}`}>
                    <label htmlFor="pprice" className="text-black">
                      How much will you pay ?
                    </label>
                    <input
                      type="text"
                      id="pprice"
                      value={this.props.userPay}
                      onChange={this.props.userPayChangeHandler}
                      required
                      className="mt-2"
                    ></input>
                  </div>
                </form>
              ) : null}
            </div>
            {!this.props.isPurchased ? (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={this.props.productBuyHandler}
                  type="button"
                  className="btn btn-primary w-25"
                >
                  {this.props.isOnBuyProgress ? (
                    <div class="spinner-border spinner-border-sm" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  ) : (
                    "Buy"
                  )}
                </button>
              </div>
            ) : (
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary confirm"
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmationModal;
