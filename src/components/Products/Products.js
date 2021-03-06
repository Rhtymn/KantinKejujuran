import React from "react";
import style from "./Products.module.css";
import Product from "../Product/Product";
import Pagination from "../Pagination/Pagination";
import Filter from "../Filter/Filter";
import Spinner from "../Spinner/Spinner";
import axios from "axios";
import {
  sortProducts,
  minIdx,
  maxIdx,
  maximumPage,
  initProductPerPage,
} from "../../Helper";
import {
  SMALL,
  MEDIUM,
  LARGE,
  VERY_LARGE,
  PRD_PER_PAGE_LARGE,
  PRD_PER_PAGE_SMALL,
  PRD_PER_PAGE_MEDIUM,
  PRD_PER_PAGE_VERY_LARGE,
} from "../../Config";

// Variable to store breakpoints callback
let fn;

// Find initial Product Per Page based on breakpoints
const initialProductPerPage = initProductPerPage();

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      currentPage: 1,
      productPerPage: initialProductPerPage,
      filterBy: "productName",
      ascending: true,
      isFetch: true,
    };
    this.getProducts = this.getProducts.bind(this);
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
    this.sortTypeChangeHandler = this.sortTypeChangeHandler.bind(this);
  }

  componentDidMount() {
    this.getProducts();
    fn = this.changeProductPerPage.bind(this);
    window.addEventListener("resize", fn);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", fn);
  }

  getProducts = async () => {
    const response = await axios.get("http://localhost:5000/products");
    const products = response.data.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        imgUrl: product.url,
        timestamp: new Date(Date.parse(product.createdAt.replace(/[-]/g, "/"))),
      };
    });
    this.setState({ products: products, isFetch: false });
  };

  // callback to change num of product per page based on breakpoints
  changeProductPerPage() {
    if (SMALL.matches) this.setState({ productPerPage: PRD_PER_PAGE_SMALL });
    if (MEDIUM.matches) this.setState({ productPerPage: PRD_PER_PAGE_MEDIUM });
    if (LARGE.matches) this.setState({ productPerPage: PRD_PER_PAGE_LARGE });
    if (VERY_LARGE.matches)
      this.setState({ productPerPage: PRD_PER_PAGE_VERY_LARGE });
  }

  // callback to change/move current page
  pageChangeHandler(page) {
    this.setState({ currentPage: page });
  }

  // callback to sort product based on choosen filter option
  filterChangeHandler(filterBy) {
    this.setState({ filterBy: filterBy });

    // reset sort type to ascending
    this.setState({ ascending: true });
  }

  // callback to change sort type
  sortTypeChangeHandler() {
    this.setState((prev) => {
      return { ascending: !prev.ascending };
    });
  }

  render() {
    // find minimumIdx & maximumIdx products that will show
    const maximumIdx = maxIdx(this.state);
    const minimumIdx = minIdx(this.state);

    // find maxPage
    const maxPage = maximumPage(this.state);

    // sort products
    this.state.products.sort(sortProducts(this.state));

    return (
      <div
        className={`${style.products} text-center d-flex flex-column align-items-center py-2`}
      >
        <Filter
          filterBy={this.state.filterBy}
          onFilterChange={this.filterChangeHandler}
          onSortTypeChange={this.sortTypeChangeHandler}
          sortType={this.state.ascending}
        />
        {this.state.isFetch ? (
          <Spinner />
        ) : (
          <div
            className={`mt-2 container-fluid ${
              this.state.products.length ? "bg-dark" : `${style.text_centered}`
            } row row-cols-md-2 row-cols-lg-2 row-cols-xxl-4`}
          >
            {this.state.products.length ? (
              this.state.products
                .slice(minimumIdx, maximumIdx)
                .map((product) => (
                  <Product
                    user={this.props.user}
                    attribute={product}
                    key={product.id}
                    balance={this.props.balance}
                    getBalance={this.props.getBalance}
                    getProducts={this.getProducts.bind(this)}
                  />
                ))
            ) : (
              <h4>Oops, nothing product here!</h4>
            )}
          </div>
        )}

        {this.state.products.length ? (
          <Pagination onPageChange={this.pageChangeHandler} maxPage={maxPage} />
        ) : null}
      </div>
    );
  }
}

export default Products;
