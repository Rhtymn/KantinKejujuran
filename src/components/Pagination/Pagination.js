import React from "react";
import style from "./Pagination.module.css";
class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = { page: 1 };
  }

  render() {
    // go to previous page
    const prevPageHandler = () => {
      if (this.state.page === 1) return;
      this.setState((prev) => {
        return {
          page: prev.page - 1,
        };
      });
      this.props.onPageChange(this.state.page - 1);
    };

    // go to next page
    const nextPageHandler = () => {
      if (this.state.page === this.props.maxPage) return;
      this.props.onPageChange(this.state.page + 1);
      this.setState((prev) => {
        return {
          page: prev.page + 1,
        };
      });
    };

    return (
      <div className={`${style.pagination} d-flex align-items-center gap-4`}>
        <button
          onClick={prevPageHandler}
          style={this.state.page === 1 ? { color: "gray" } : null}
        >
          <i className={`fa-solid fa-caret-left `}></i>
        </button>
        <span>{this.state.page}</span>
        <button
          onClick={nextPageHandler}
          style={
            this.state.page === this.props.maxPage ? { color: "gray" } : null
          }
        >
          <i className={`fa-solid fa-caret-right w-auto`}></i>
        </button>
      </div>
    );
  }
}
export default Pagination;
