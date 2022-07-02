import React from "react";
class Alert extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className={`alert ${this.props.alertType} m-0 mt-2 text-center`}
        role="alert"
      >
        {this.props.message}
      </div>
    );
  }
}

export default Alert;
