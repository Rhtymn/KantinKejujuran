import React from "react";
import Form from "../../components/Form/Form";
class SellForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`col col-md-6 col-lg-4 mx-auto text-center py-3`}>
        <Form onAddProduct={this.props.onAddProduct} />
      </div>
    );
  }
}
export default SellForm;
