import React, { useState } from "react";
import "./MainLayout.css";
import addImageIcon from "../../svg/image-regular.svg";

export default function MainLayout() {
  const [addedImg, setAddedImg] = useState();
  const [imgDim, setImgDim] = useState();

  const addImageHandler = (e) => {
    const imgPreviewDiv = document.getElementById("preview");
    const file = e.target.files[0];
    const canvas = document.getElementById("my-canvas");
    const context = canvas.getContext("2d");
    const reader = new FileReader();
    const img = new Image();
    img.src = window.URL.createObjectURL(file);
    img.onload = () => {
      imgPreviewDiv.appendChild(img);
      setImgDim(`${img.width}×${img.height}`);
      // imgPreviewDiv.insertAdjacentHTML(
      //   "beforeend",
      //   `<div>${file.name} ${img.width}×${img.height} ${file.type} ${Math.round(
      //     file.size / 1024
      //   )}KB<div>`
      // );
      window.URL.revokeObjectURL(img.src);
      img.src = window.URL.createObjectURL(file);
      context.drawImage(img, 0, 0);
    };
    setAddedImg(window.URL.createObjectURL(file));
  };

  return (
    <>
      <div className="container">
        <div className="canvas-container">
          <canvas id="my-canvas" />
        </div>
        <div className="options-container">
          <div className="add-image-container">
            <label for="add-image-tag">
              <div className="add-image-container-1">
                <img
                  src={addImageIcon}
                  width={50}
                  height={50}
                  className="add-image-icon"
                  alt="add"
                />
                <input
                  type="file"
                  className="add-image-input-tag"
                  id="add-image-tag"
                  onChange={addImageHandler}
                />
                <h5>Add Image</h5>
              </div>
            </label>
          </div>
        </div>
      </div>
      <div id="preview"></div>
    </>
  );
}
