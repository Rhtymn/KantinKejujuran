import React from "react";
import style from "./Products.module.css";
import Product from "../Product/Product";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";

class Products extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={`${style.products} col py-3 text-center d-flex flex-column align-items-center`}
      >
        <h1 className="">Selled Product</h1>
        <Filter
          filterBy={this.props.filterBy}
          onFilterChange={this.props.onFilterChange}
          onSortTypeChange={this.props.onSortTypeChange}
          sortType={this.props.sortType}
        />
        <div
          className={`${style["product_container"]} mb-3 mt-2 container-fluid bg-dark row row-cols-md-2 row-cols-lg-2 row-cols-xxl-4`}
        >
          {this.props.products.map((product) => (
            <Product attribute={product} key={product.id} />
          ))}
        </div>
        <Pagination
          onPageChange={this.props.onPageChange}
          maxPage={this.props.maxPage}
        />
      </div>
    );
  }
}

export default Products;
