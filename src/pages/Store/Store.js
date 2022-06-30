import React from "react";
import Products from "../../components/Products/Products";
import CanteenBalance from "../../components/CanteenBalance/CanteenBalance";
class Store extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="col">
        {this.props.user ? (
          <CanteenBalance
            balance={this.props.balance}
            getBalance={this.props.getBalance}
          />
        ) : null}
        <Products
          user={this.props.user}
          balance={this.props.balance}
          getBalance={this.props.getBalance}
        />
      </div>
    );
  }
}

export default Store;
