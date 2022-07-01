import React from "react";
class Input extends React.Component {
  render() {
    return (
      <div className="mb-3">
        <label htmlFor="pName" className="form-label">
          {this.props.label}
        </label>
        <input
          type="text"
          className="form-control"
          id={this.props.id}
          value={this.props.value}
          onChange={this.props.onInputChange}
          onFocus={() => this.props.onRemoveAlert()}
          required
        ></input>
      </div>
    );
  }
}

export default Input;
