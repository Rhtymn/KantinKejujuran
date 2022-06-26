import React from "react";
import Products from "../../components/Products/Products";
class Store extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Products
        products={this.props.products}
        onPageChange={this.props.onPageChange}
        maxPage={this.props.maxPage}
        filterBy={this.props.filterBy}
        onFilterChange={this.props.onFilterChange}
        onSortTypeChange={this.props.onSortTypeChange}
        sortType={this.props.sortType}
      />
    );
  }
}

export default Store;
