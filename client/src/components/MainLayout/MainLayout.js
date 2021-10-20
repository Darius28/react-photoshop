import React from "react";
import "./MainLayout.css";
import addImage from "../../svg/image-regular.svg";

export default function MainLayout() {
  return (
    <>
      <div className="container">
        <div className="canvas-container"></div>
        <div className="options-container">
          <div className="add-image-container">
            <label for="add-image-tag">
              <div className="add-image-container-1">
                <img
                  src={addImage}
                  width={50}
                  height={50}
                  className="add-image-icon"
                />
                <input
                  type="file"
                  className="add-image-input-tag"
                  id="add-image-tag"
                />
                <h5>Add Image</h5>
              </div>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
