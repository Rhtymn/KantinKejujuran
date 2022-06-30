import React from "react";
class TextArea extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="mb-3">
        <label htmlFor="pDesc" className="form-label">
          {this.props.label}
        </label>
        <textarea
          className="form-control"
          id="pDesc"
          rows="3"
          value={this.props.value}
          onChange={this.props.onInputChange}
          required
        ></textarea>
      </div>
    );
  }
}

export default TextArea;
