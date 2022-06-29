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
      isPurchased: false,
      userPay: "",
      alert: { isAlert: false, message: "", type: "" },
    };
    this.productBuyHandler = this.productBuyHandler.bind(this);
    this.userPayChangeHandler = this.userPayChangeHandler.bind(this);
    this.reloadHandler = this.reloadHandler.bind(this);
  }

  async productBuyHandler() {
    try {
      // user doesn't enter price
      if (this.state.userPay === "") {
        this.setState({
          alert: {
            isAlert: true,
            message: "Please choose price which you want",
            type: "alert-danger",
          },
        });
        return;
      }

      // price input not number
      if (!+this.state.userPay || +this.state.userPay < 0) {
        this.setState({
          alert: {
            isAlert: true,
            message: "your choosen price must a number & more than 0",
            type: "alert-danger",
          },
        });
        return;
      }

      // add userpay to balance
      const newBalance = +this.props.balance + +this.state.userPay;

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
      // change isPurchased state & reset input
      this.setState({ isPurchased: true, userPay: "" });

      // update balance in database
      await axios.patch("http://localhost:5000/canteen-balance/1", {
        balance: newBalance,
      });

      // delete product from database
      await axios.delete(
        `http://localhost:5000/products/${this.props.attribute.id}`
      );

      // re-fetch canteen balance from database
      await this.props.getBalance();
    } catch (error) {
      console.log(error);
    }
  }

  userPayChangeHandler(e) {
    this.setState({ userPay: e.target.value });
  }

  async reloadHandler(e) {
    if (!this.state.alert.isAlert) {
      // reset input
      this.setState({ userPay: "" });
      return;
    }
    const element = e.target;
    if (
      element.classList.contains("overlay") ||
      element.classList.contains("confirm") ||
      element.classList.contains("btn-close")
    ) {
      // re-fetch products from database
      await this.props.getProducts();
    }
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
              id="modalBtn"
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
          className="modal fade overlay"
          id="confirmationModal"
          tabIndex="-1"
          aria-labelledby="confirmationModal"
          aria-hidden="true"
          onClick={this.reloadHandler}
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
                {!this.state.isPurchased ? (
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
                ) : null}
              </div>
              {!this.state.isPurchased ? (
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
      </>
    );
  }
}
export default Product;
