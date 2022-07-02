import React from "react";
import style from "./Product.module.css";
import TimeAgo from "javascript-time-ago";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import id from "../../../node_modules/javascript-time-ago/locale/id.json";
import axios from "axios";
import LoginAlertModal from "../LoginAlertModal/LoginAlertModal";
import bengbeng from "../../assets/img/beng-beng.jpg";

// SET LOCALE ID TimeAgo
TimeAgo.addLocale(id);
const timeAgo = new TimeAgo("id-ID");

class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOnBuyProgress: false,
      isImageLoaded: false,
      isPurchased: false,
      userPay: "",
      alert: { isAlert: false, message: "", type: "" },
    };
    this.productBuyHandler = this.productBuyHandler.bind(this);
    this.userPayChangeHandler = this.userPayChangeHandler.bind(this);
    this.reloadHandler = this.reloadHandler.bind(this);
    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.removeSpinner = this.removeSpinner.bind(this);
    this.alert = this.alert.bind(this);
  }

  alert(message, alertType) {
    this.setState({
      isOnBuyProgress: false,
      alert: { isAlert: true, message: message, type: alertType },
    });
  }

  async productBuyHandler() {
    try {
      // user doesn't enter price
      if (this.state.userPay === "") {
        this.alert("Please choose price which you want", "alert-danger");
        return;
      }

      // price input not number
      if (!+this.state.userPay || +this.state.userPay < 0) {
        this.alert(
          "your choosen price must a number & more than 0",
          "alert-danger"
        );
        return;
      }

      // add userpay to balance
      const newBalance = +this.props.balance + +this.state.userPay;

      // set success buy alert
      if (+this.state.userPay >= +this.props.attribute.price) {
        // user honest
        this.alert(
          "Thanks for being honest person! i'm appreciate it!",
          "alert-success"
        );
      } else {
        // user lie
        this.alert(
          "I know you're lying! but you can take that product",
          "alert-warning"
        );
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

  handleImageLoaded() {
    this.setState({ isImageLoaded: true });
  }

  removeSpinner() {
    this.setState({ isOnBuyProgress: false });
  }

  render() {
    return (
      <>
        <div className={`${style.product} bg-dark py-3 px-md-3`}>
          <div className="row mb-2">
            <div
              className={`${style["product_image"]} d-flex align-items-center justify-content-center`}
            >
              <img
                className={`img-fluid ${
                  !this.state.isImageLoaded ? "d-none" : ""
                }`}
                src={this.props.attribute.imgUrl}
                onLoad={this.handleImageLoaded}
              ></img>
              {
                <div
                  className={`spinner-border spinner-border-sm ${
                    this.state.isImageLoaded ? "d-none" : ""
                  }`}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              }
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
              data-bs-target={
                this.props.user ? "#confirmationModal" : "#loginAlertModal"
              }
            >
              {this.props.attribute.price}
            </button>
            <span className="border-bottom mt-1"></span>
          </div>
        </div>

        {this.props.user ? (
          <ConfirmationModal
            reloadHandler={this.reloadHandler}
            alert={this.state.alert}
            isPurchased={this.state.isPurchased}
            userPay={this.state.userPay}
            userPayChangeHandler={this.userPayChangeHandler}
            productBuyHandler={this.productBuyHandler}
            isOnBuyProgress={this.state.isOnBuyProgress}
            onRemoveSpinner={this.removeSpinner}
          />
        ) : (
          <LoginAlertModal />
        )}
      </>
    );
  }
}
export default Product;
