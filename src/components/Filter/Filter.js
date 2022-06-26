import React from "react";
import style from "./Filter.module.css";

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const optionChangeHandler = (e) => {
      this.props.onFilterChange(e.target.value);
    };

    const sortTypeChangeHandler = () => {
      this.props.onSortTypeChange();
    };

    return (
      <div
        className={`${style.filter} container-fluid d-flex bg-dark justify-content-end align-items-center p-0 gap-2 py-1 pe-1`}
      >
        <label className="fw-bold col-auto">Urutkan :</label>
        <select
          id="filter-option"
          className="col-auto p-0"
          onChange={optionChangeHandler}
          value={this.props.filterBy}
        >
          <option value="productName">Product Name</option>
          <option value="datetime">Datetime</option>
        </select>
        <button
          className={`${style["sort_type"]} ${
            this.props.sortType ? "" : "d-none"
          }`}
          onClick={sortTypeChangeHandler}
        >
          <i className={`fa-solid fa-caret-up`}></i>
        </button>
        <button
          className={`${style["sort_type"]} ${
            this.props.sortType ? "d-none" : ""
          }`}
          onClick={sortTypeChangeHandler}
        >
          <i className={`fa-solid fa-caret-down`}></i>
        </button>
      </div>
    );
  }
}
export default Filter;
