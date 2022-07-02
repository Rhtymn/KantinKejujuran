import React from "react";
class LoginAlertModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="modal fade"
        id="loginAlertModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body pb-0">
              <div className="alert alert-danger " role="alert">
                Please login to buy product!
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginAlertModal;
