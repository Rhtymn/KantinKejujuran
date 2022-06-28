import React from "react";
import style from "./Product.module.css";
import TimeAgo from "javascript-time-ago";
import id from "../../../node_modules/javascript-time-ago/locale/id.json";
import axios from "axios";
// SET LOCALE ID TimeAgo
TimeAgo.addLocale(id);
const timeAgo = new TimeAgo("id-ID");

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userPay: "",
      alert: { isAlert: false, message: "", type: "" },
    };
    this.productBuyHandler = this.productBuyHandler.bind(this);
    this.userPayChangeHandler = this.userPayChangeHandler.bind(this);
  }

  async productBuyHandler() {
    // price input not number
    if (!+this.state.userPay) {
      this.setState({
        alert: {
          isAlert: true,
          message: "your choosen price must a number",
          type: "alert-danger",
        },
      });
      return;
    }

    // reset input
    this.setState({ userPay: "" });

    // set success buy alert
    if (+this.state.userPay >= +this.props.attribute.price) {
      // user honest
      this.setState({
        alert: {
          isAlert: true,
          message: "Thanks for being honest person! i'm appreciate it!",
          type: "alert-success",
        },
      });
    } else {
      // user lie
      this.setState({
        alert: {
          isAlert: true,
          message: "I know you're lying! but you can take that product",
          type: "alert-warning",
        },
      });
    }
  }

  userPayChangeHandler(e) {
    this.setState({ userPay: e.target.value });
  }

  render() {
    return (
      <>
        <div className={`${style.product} bg-dark py-3 px-md-3`}>
          <div className="row mb-2">
            <div className={`${style["product_image"]} col-auto`}>
              <img className="img-fluid"></img>
            </div>
            <div
              className={`${style["product_info"]} d-flex flex-column ms-2 col-7 col-md-8 col-lg-7 p-0 ps-1`}
            >
              <span className={`${style["product_name"]}`}>
                {this.props.attribute.name}
              </span>
              <span className={`${style["product_timestamp"]} mb-1`}>
                {timeAgo.format(this.props.attribute.timestamp)}
              </span>
              <p className={`${style["product_description"]} mb-1`}>
                {this.props.attribute.description}
              </p>
            </div>
          </div>
          <div className={`row justify-content-between`}>
            <button
              className={`${style["btn_buy"]} btn btn-sm btn-primary`}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#confirmationModal"
            >
              {this.props.attribute.price}
            </button>
            <span className="border-bottom mt-1"></span>
          </div>
        </div>

        <div
          className="modal fade"
          id="confirmationModal"
          tabIndex="-1"
          aria-labelledby="confirmationModal"
          aria-hidden="true"
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
                {this.state.alert.isAlert ? (
                  <div
                    className={`alert ${this.state.alert.type} m-0`}
                    role="alert"
                  >
                    {this.state.alert.message}
                  </div>
                ) : null}
                <form>
                  <div className={`${style["input_container"]}`}>
                    <label htmlFor="pprice" className="text-black">
                      How much will you pay ?
                    </label>
                    <input
                      type="text"
                      id="pprice"
                      value={this.state.userPay}
                      onChange={this.userPayChangeHandler}
                      required
                      className="mt-2"
                    ></input>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={this.productBuyHandler}
                  type="button"
                  className="btn btn-primary"
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default Product;
