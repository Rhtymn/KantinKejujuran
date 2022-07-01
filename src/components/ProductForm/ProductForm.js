import React from "react";
import axios from "axios";
import Input from "./Input";
import TextArea from "./TextArea";
class ProductForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pName: "",
      pPrice: "",
      pDesc: "",
      alert: { isAlert: false, message: "", type: "" },
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.saveProduct = this.saveProduct.bind(this);
    this.alert = this.alert.bind(this);
    this.removeAlert = this.removeAlert.bind(this);
  }

  inputChangeHandler(e) {
    const elementId = e.target.id;
    if (elementId === "pName") this.setState({ pName: e.target.value });
    if (elementId === "pPrice") this.setState({ pPrice: e.target.value });
    if (elementId === "pDesc") this.setState({ pDesc: e.target.value });
  }

  alert(message, alertType) {
    this.setState({
      alert: { isAlert: true, message: message, type: alertType },
    });
  }

  removeAlert() {
    this.setState({ alert: { isAlert: false, message: "", type: "" } });
  }

  async saveProduct(e) {
    try {
      e.preventDefault();
      // price input not number
      if (!+this.state.pPrice) {
        this.alert("Product price must a number", "alert-danger");
        return;
      }

      // reduce balance
      const reducedBalance = +this.props.balance - +this.state.pPrice;
      if (reducedBalance < 0) {
        // canteen balance not enough
        this.alert("Canteen Balance not enough", "alert-warning");
        return;
      }

      // add new product to database
      await axios.post("http://localhost:5000/products", {
        name: this.state.pName,
        price: +this.state.pPrice,
        description: this.state.pDesc,
      });

      // update canteen balance to database
      await axios.patch("http://localhost:5000/canteen-balance/1", {
        balance: reducedBalance,
      });

      // re-fetch canteen balance from database
      this.props.getBalance();

      // alert success add a product
      this.alert("Success adding new product", "alert-success");

      // reset input element
      this.setState({ pName: "", pPrice: "", pDesc: "" });

      this.props.setActiveNav();
    } catch (error) {
      // alert failed add a product
      this.alert("Failed adding new product", "alert-danger");
    }
  }

  render() {
    return (
      <>
        {this.state.alert.isAlert ? (
          <div className={`alert ${this.state.alert.type}`} role="alert">
            {this.state.alert.message}
          </div>
        ) : null}
        <form
          className="text-black text-start pt-0"
          onSubmit={this.saveProduct}
        >
          <h4>Product Form</h4>
          <Input
            id="pName"
            label="Product name:"
            value={this.state.pName}
            onInputChange={this.inputChangeHandler}
            onRemoveAlert={this.removeAlert}
          />
          <Input
            id="pPrice"
            label="Product price:"
            value={this.state.pPrice}
            onInputChange={this.inputChangeHandler}
            onRemoveAlert={this.removeAlert}
          />
          <TextArea
            id="pDesc"
            label="Product description:"
            value={this.state.pDesc}
            onInputChange={this.inputChangeHandler}
            onRemoveAlert={this.removeAlert}
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </>
    );
  }
}

export default ProductForm;
