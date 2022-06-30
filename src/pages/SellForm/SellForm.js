import React from "react";
import ProductForm from "../../components/ProductForm/ProductForm";
class SellForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`col col-md-6 col-lg-4 mx-auto text-center py-3`}>
        <ProductForm
          balance={this.props.balance}
          getBalance={this.props.getBalance}
        />
      </div>
    );
  }
}
export default SellForm;
