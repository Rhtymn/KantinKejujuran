import React from "react";
import style from "./Form.module.css";
import moment from "moment";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productName: "",
      productPrice: "",
      productDesc: "",
      alert: { isAlert: false, message: "" },
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // callback to handle when input change
  handleChange(e) {
    const idElement = e.target.id;
    const value = e.target.value;
    if (idElement === "pname") this.setState({ productName: value });
    if (idElement === "pprice") this.setState({ productPrice: value });
    if (idElement === "pdesc") this.setState({ productDesc: value });
  }

  // callback to handle submit form
  handleSubmit(e) {
    e.preventDefault();

    // price input not number
    if (!+this.state.productPrice) {
      this.setState({
        alert: {
          isAlert: true,
          message: "Product price must a number",
          type: "alert-danger",
        },
      });
      return;
    }

    // make a input object
    const { productName, productPrice, productDesc } = this.state;
    const product = {
      name: productName,
      price: productPrice,
      description: productDesc,
      timestamp: moment(),
    };

    // reset input element
    this.setState({ productName: "", productPrice: "", productDesc: "" });

    // send new product to App component
    this.props.onAddProduct(product);

    // alert success add a product
    this.setState({
      alert: {
        isAlert: true,
        message: "Success adding new product",
        type: "alert-success",
      },
    });
  }

  // imgInputChange(e) {
  //   // console.log(e.target.files);
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     alert(reader.result);
  //   };
  // }

  render() {
    return (
      <>
        {this.state.alert.isAlert ? (
          <div className={`alert ${this.state.alert.type}`} role="alert">
            {this.state.alert.message}
          </div>
        ) : null}
        <div className={`${style["form_container"]} container bg-dark rounded`}>
          <form className={`${style["form"]}`} onSubmit={this.handleSubmit}>
            <h1>Product Form</h1>
            <div className={`${style["input_container"]}`}>
              <label htmlFor="pname">Product name:</label>
              <input
                type="text"
                id="pname"
                name="pname"
                value={this.state.productName}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className={`${style["input_container"]}`}>
              <label htmlFor="pprice">Product price:</label>
              <input
                type="text"
                id="pprice"
                value={this.state.productPrice}
                onChange={this.handleChange}
                required
              ></input>
            </div>
            <div className={`${style["input_container"]}`}>
              <label htmlFor="pdesc">Product description:</label>
              <textarea
                rows={"5"}
                cols="30"
                id="pdesc"
                value={this.state.productDesc}
                onChange={this.handleChange}
                required
              ></textarea>
            </div>
            {/* <div className={`${style["input_container"]} mb-3`}>
              <label for="pimg">Product image:</label>
              <input
                onChange={this.imgInputChange}
                type="file"
                id="pimg"
              ></input>
            </div> */}
            <button type="submit" className={`${style["btn_submit"]}`}>
              Submit
            </button>
          </form>
        </div>
      </>
    );
  }
}
export default Form;
