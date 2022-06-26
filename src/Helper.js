const {
  SMALL,
  MEDIUM,
  LARGE,
  VERY_LARGE,
  PRD_PER_PAGE_LARGE,
  PRD_PER_PAGE_MEDIUM,
  PRD_PER_PAGE_SMALL,
  PRD_PER_PAGE_VERY_LARGE,
} = require("./Config");

// Function to sort products
const sortProducts = (state) => {
  return (a, b) => {
    if (state.filterBy === "productName") {
      if (state.ascending) {
        if (a.name < b.name) return -1;
        if (a.name > b.name) return 1;
        return 0;
      } else {
        if (a.name < b.name) return 1;
        if (a.name > b.name) return -1;
        return 0;
      }
    }
    if (state.filterBy === "datetime") {
      if (state.ascending) {
        if (a.timestamp > b.timestamp) return -1;
        if (a.timestamp < b.timestamp) return 1;
        return 0;
      } else {
        if (a.timestamp > b.timestamp) return 1;
        if (a.timestamp < b.timestamp) return -1;
        return 0;
      }
    }
  };
};

// Function to find minimumIdx & maximumIdx products that will show
const maxIdx = (state) => state.currentPage * state.productPerPage;
const minIdx = (state) => maxIdx(state) - state.productPerPage;

// Function to find maxPage
const maximumPage = (state) => {
  return state.products.length % state.productPerPage === 0
    ? state.products.length / state.productPerPage
    : Math.floor(state.products.length / state.productPerPage) + 1;
};

// Function to find initialProductPerPage based on breakpoints
const initProductPerPage = () => {
  return SMALL.matches
    ? PRD_PER_PAGE_SMALL
    : MEDIUM.matches
    ? PRD_PER_PAGE_MEDIUM
    : LARGE.matches
    ? PRD_PER_PAGE_LARGE
    : VERY_LARGE.matches
    ? PRD_PER_PAGE_VERY_LARGE
    : null;
};

module.exports = {
  sortProducts,
  minIdx,
  maxIdx,
  maximumPage,
  initProductPerPage,
};
