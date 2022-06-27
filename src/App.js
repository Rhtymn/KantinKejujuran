import React from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Store from "./pages/Store/Store";
import SellForm from "./pages/SellForm/SellForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import moment from "moment";
import "moment/locale/id";
import {
  SMALL,
  MEDIUM,
  LARGE,
  VERY_LARGE,
  PRD_PER_PAGE_LARGE,
  PRD_PER_PAGE_SMALL,
  PRD_PER_PAGE_MEDIUM,
  PRD_PER_PAGE_VERY_LARGE,
} from "./Config";
import {
  sortProducts,
  minIdx,
  maxIdx,
  maximumPage,
  initProductPerPage,
} from "./Helper";

// SET LOCALE ID MOMENT.JS
moment.locale("id");

// Variable to store breakpoints callback
let fn;

// Find initial Product Per Page based on breakpoints
const initialProductPerPage = initProductPerPage();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterBy: "productName",
      ascending: true,
      products: [
        {
          id: 1,
          name: "Beng-Beng",
          description: "Ini Makanan Enak!",
          price: "5.000",
          timestamp: moment("2022-06-01"),
        },
        {
          id: 2,
          name: "Oreo",
          description: "Ah enak sekali!",
          price: "4.000",
          timestamp: moment("2022-06-02"),
        },
        {
          id: 3,
          name: "Go Potato",
          description: "Gurih-gurih nyoi!",
          price: "2.000",
          timestamp: moment("2022-06-02"),
        },
        {
          id: 4,
          name: "Malkist Keju",
          description: "Mantap sekali kejunya!",
          price: "8.000",
          timestamp: moment("2022-06-03"),
        },
        {
          id: 5,
          name: "Go Potato",
          description: "Gurih-gurih nyoi!",
          price: "2.000",
          timestamp: moment("2022-06-04"),
        },
      ],
      currentPage: 1,
      productPerPage: initialProductPerPage,
    };
    this.pageChangeHandler = this.pageChangeHandler.bind(this);
    this.filterChangeHandler = this.filterChangeHandler.bind(this);
    this.sortTypeChangeHandler = this.sortTypeChangeHandler.bind(this);
    this.addProductHandler = this.addProductHandler.bind(this);
  }

  // callback to change num of product per page based on breakpoints
  changeProductPerPage() {
    if (SMALL.matches) this.setState({ productPerPage: PRD_PER_PAGE_SMALL });
    if (MEDIUM.matches) this.setState({ productPerPage: PRD_PER_PAGE_MEDIUM });
    if (LARGE.matches) this.setState({ productPerPage: PRD_PER_PAGE_LARGE });
    if (VERY_LARGE.matches)
      this.setState({ productPerPage: PRD_PER_PAGE_VERY_LARGE });
  }

  componentDidMount() {
    fn = this.changeProductPerPage.bind(this);
    window.addEventListener("resize", fn);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", fn);
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

  // callback to add new product
  addProductHandler(product) {
    this.setState((prev) => {
      return { products: [...prev.products, product] };
    });
  }

  render() {
    // find minimumIdx & maximumIdx products that will show
    const maximumIdx = maxIdx(this.state);
    const minimumIdx = minIdx(this.state);

    // find maxPage
    const maxPage = maximumPage(this.state);

    return (
      <Router>
        <div className="App container-fluid">
          <div className="row flex-nowrap">
            <Sidebar />
            <Routes>
              <Route
                exact
                path="/sell-form"
                element={<SellForm onAddProduct={this.addProductHandler} />}
              ></Route>
              <Route
                path="*"
                element={
                  <Store
                    products={this.state.products
                      .sort(sortProducts(this.state))
                      .slice(minimumIdx, maximumIdx)}
                    onPageChange={this.pageChangeHandler}
                    maxPage={maxPage}
                    filterBy={this.state.filterBy}
                    onFilterChange={this.filterChangeHandler}
                    onSortTypeChange={this.sortTypeChangeHandler}
                    sortType={this.state.ascending}
                  />
                }
              ></Route>
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

{
  /* <Products
            products={this.state.products
              .sort(sortProducts(this.state))
              .slice(minimumIdx, maximumIdx)}
            onPageChange={pageChangeHandler}
            maxPage={maxPage}
            filterBy={this.state.filterBy}
            onFilterChange={filterChangeHandler}
            onSortTypeChange={sortTypeChangeHandler}
            sortType={this.state.ascending}
          /> */
}

// products: [
//   {
//     id: 1,
//     name: "Beng-Beng",
//     description: "Ini Makanan Enak!",
//     price: "5.000",
//     timestamp: moment("2022-06-01"),
//   },
//   {
//     id: 2,
//     name: "Oreo",
//     description: "Ah enak sekali!",
//     price: "4.000",
//     timestamp: moment("2022-06-02"),
//   },
//   {
//     id: 3,
//     name: "Go Potato",
//     description: "Gurih-gurih nyoi!",
//     price: "2.000",
//     timestamp: moment("2022-06-02"),
//   },
//   {
//     id: 4,
//     name: "Malkist Keju",
//     description: "Mantap sekali kejunya!",
//     price: "8.000",
//     timestamp: moment("2022-06-03"),
//   },
//   {
//     id: 5,
//     name: "Go Potato",
//     description: "Gurih-gurih nyoi!",
//     price: "2.000",
//     timestamp: moment("2022-06-04"),
//   },
//   {
//     id: 6,
//     name: "Beng-Beng P-2",
//     description: "Ini Makanan Enak!",
//     price: "5.000",
//     timestamp: moment("2022-06-04"),
//   },
//   {
//     id: 7,
//     name: "Oreo P-2",
//     description: "Ah enak sekali!",
//     price: "4.000",
//     timestamp: moment("2022-06-05"),
//   },
//   {
//     id: 8,
//     name: "Go Potato P-2",
//     description: "Gurih-gurih nyoi!",
//     price: "2.000",
//     timestamp: moment("2022-06-05"),
//   },
//   {
//     id: 9,
//     name: "Malkist Keju P-2",
//     description: "Mantap sekali kejunya!",
//     price: "8.000",
//     timestamp: moment("2022-06-05"),
//   },
//   {
//     id: 10,
//     name: "Go Potato P-2",
//     description: "Gurih-gurih nyoi!",
//     price: "2.000",
//     timestamp: moment("2022-06-06"),
//   },
//   {
//     id: 11,
//     name: "Beng-Beng P-3",
//     description: "Ini Makanan Enak!",
//     price: "5.000",
//     timestamp: moment("2022-06-07"),
//   },
//   {
//     id: 12,
//     name: "Oreo P-3",
//     description: "Ah enak sekali!",
//     price: "4.000",
//     timestamp: moment("2022-06-08"),
//   },
//   {
//     id: 13,
//     name: "Go Potato P-3",
//     description: "Gurih-gurih nyoi!",
//     price: "2.000",
//     timestamp: moment("2022-06-09"),
//   },
//   {
//     id: 14,
//     name: "Malkist Keju P-3",
//     description: "Mantap sekali kejunya!",
//     price: "8.000",
//     timestamp: moment("2022-06-09"),
//   },
//   {
//     id: 15,
//     name: "Go Potato P-3",
//     description: "Gurih-gurih nyoi!",
//     price: "2.000",
//     timestamp: moment("2022-06-10"),
//   },
//   {
//     id: 16,
//     name: "Beng-Beng P-4",
//     description: "Ini Makanan Enak!",
//     price: "5.000",
//     timestamp: moment("2022-06-11"),
//   },
//   {
//     id: 17,
//     name: "Oreo P-4",
//     description: "Ah enak sekali!",
//     price: "4.000",
//     timestamp: moment("2022-06-11"),
//   },
//   {
//     id: 18,
//     name: "Go Potato P-4",
//     description: "Gurih-gurih nyoi!",
//     price: "2.000",
//     timestamp: moment("2022-06-12"),
//   },
//   {
//     id: 19,
//     name: "Malkist Keju P-4",
//     description: "Mantap sekali kejunya!",
//     price: "8.000",
//     timestamp: moment("2022-06-13"),
//   },
//   {
//     id: 20,
//     name: "Go Potato P-4",
//     description: "Gurih-gurih nyoi!",
//     price: "2.000",
//     timestamp: moment("2022-06-25"),
//   },
// ],
