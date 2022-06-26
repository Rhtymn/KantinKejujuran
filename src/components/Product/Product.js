import React from "react";
import style from "./Product.module.css";
import { TIME_FORMAT } from "../../Config";
class Product extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
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
              {this.props.attribute.timestamp.fromNow()}
            </span>
            <p className={`${style["product_description"]} mb-1`}>
              {this.props.attribute.description}
            </p>
            {/* <span className={`${style["product_price"]}`}>5.000</span> */}
          </div>
        </div>
        <div className={`row justify-content-between`}>
          <button className={`${style["btn_buy"]} btn btn-sm btn-primary`}>
            {this.props.attribute.price}
          </button>
          <span className="border-bottom mt-1"></span>
        </div>
      </div>
    );
  }
}

export default Product;
