import React, { useState } from "react";
import "./MainLayout.css";
import addImageIcon from "../../svg/image-regular.svg";
import Resizer from "react-image-file-resizer";

export default function MainLayout() {
  const [addedImg, setAddedImg] = useState();
  const [imgDim, setImgDim] = useState();

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const previewImageHandler = async (e) => {
    var reader = new FileReader();
    const finalImage = await resizeFile(e.target.files[0]);
    reader.onload = (e) => {
      document.getElementById("preview").setAttribute("src", finalImage);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const confirmImageHandler = () => {
    const canvas = document.getElementById("my-canvas");
    const context = canvas.getContext("2d");
    var image = document.getElementById("preview");
    context.drawImage(image, 0, 0, 300, 300);
    document.getElementById("preview").setAttribute("src", "");
  };

  return (
    <>
      <div className="container">
        <div className="canvas-container">
          <canvas id="my-canvas" width={1000} height={500} />
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
                  onChange={previewImageHandler}
                />
                <h5>Add Image</h5>
              </div>
              <div>
                <img id="preview" />
              </div>
              <button onClick={confirmImageHandler}>Confirm Image</button>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
