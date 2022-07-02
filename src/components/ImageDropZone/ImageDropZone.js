import React, { useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
  color: "black",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function ImageDropZone(props) {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "image/png": [],
      "image/jpg": [],
      "image/jpeg": [],
    },
    maxSize: 5000000,
    onDropAccepted: (acceptedFiles) => {
      props.onSetImage(acceptedFiles[0]);
    },
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="mb-3">
      <label className="form-label">Product image:</label>
      <div {...getRootProps({ style })}>
        <input className="input-zone" {...getInputProps()} />
        <div className="text-center">
          <div className="fs-1">
            <i className="fa-solid fa-file-arrow-up"></i>
          </div>
          <p className="dropzone-content">
            Drag’n’drop some files here, or click to select files
          </p>
        </div>
      </div>
      <small className="form-text text-muted">
        Please upload image with aspect ratio 1 x 1
      </small>
    </div>
  );
}

export default ImageDropZone;
