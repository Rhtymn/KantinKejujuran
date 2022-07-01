import React from "react";
class Input extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="form-group mb-2">
        <label>{this.props.label}</label>
        <input
          id={this.props.id}
          type={this.props.type}
          className="form-control"
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={this.props.onInputChange}
          required
        ></input>
        <small className="form-text text-muted">{this.props.hint}</small>
      </div>
    );
  }
}

export default Input;
