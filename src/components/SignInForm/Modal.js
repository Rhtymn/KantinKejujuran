import React from "react";
import { Link } from "react-router-dom";
import Alert from "../Alert/Alert";
class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`modal fade ${this.props.showModal ? "show" : ""}`}
        style={
          this.props.showModal ? { display: "block" } : { display: "none" }
        }
        id="loginModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Login Information
              </h5>
            </div>
            <div className="modal-body">
              <Alert
                alertType={this.props.alertType}
                message={this.props.message}
              />
            </div>
            <div className="modal-footer">
              <Link
                onClick={() => this.props.onCloseModal()}
                to={this.props.isValid ? "/store" : "/user/sign-in"}
              >
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  OK
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
