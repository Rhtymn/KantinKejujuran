import React from "react";
class ImagePreview extends React.Component {
  render() {
    return (
      <div>
        <div
          className="mb-3 border p-1"
          style={{ width: "100px", height: "100px" }}
        >
          <img
            className="img-fluid"
            src={URL.createObjectURL(this.props.img)}
          ></img>
        </div>
      </div>
    );
  }
}

export default ImagePreview;
