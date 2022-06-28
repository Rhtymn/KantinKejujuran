import React from "react";
import Products from "../../components/Products/Products";
class Store extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Products balance={this.props.balance} />;
  }
}

export default Store;
