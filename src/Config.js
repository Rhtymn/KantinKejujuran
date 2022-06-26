// // Responsive Breakpoints
// let SMALL = window.matchMedia("(max-width: 767px)");
// let MEDIUM = window.matchMedia("(min-width: 768px) and (max-width: 1400px)");
// let LARGE = window.matchMedia("(min-width: 1401px)");

// // Product per Page based on breakpoints
// const PRD_PER_PAGE_SMALL = 4;
// const PRD_PER_PAGE_MEDIUM = 12;
// const PRD_PER_PAGE_LARGE = 16;

// // Timestamp Format
// const TIME_FORMAT = "DD MMMM YYYY";

// Responsive Breakpoints
let SMALL = window.matchMedia("(max-width: 767px)");
let MEDIUM = window.matchMedia("(min-width: 768px) and (max-width: 1199px)");
let LARGE = window.matchMedia("(min-width: 1200px) and (max-width: 1400px)");
let VERY_LARGE = window.matchMedia("(min-width: 1401px)");

// Product per Page based on breakpoints
const PRD_PER_PAGE_SMALL = 4;
const PRD_PER_PAGE_MEDIUM = 14;
const PRD_PER_PAGE_LARGE = 12;
const PRD_PER_PAGE_VERY_LARGE = 16;

// Timestamp Format
const TIME_FORMAT = "DD MMMM YYYY";

module.exports = {
  SMALL,
  MEDIUM,
  LARGE,
  VERY_LARGE,
  PRD_PER_PAGE_SMALL,
  PRD_PER_PAGE_MEDIUM,
  PRD_PER_PAGE_LARGE,
  PRD_PER_PAGE_VERY_LARGE,
  TIME_FORMAT,
};
