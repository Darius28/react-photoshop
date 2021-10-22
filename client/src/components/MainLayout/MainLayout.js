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
        "file"
      );
    });

  const addImageHandler = async (e) => {
    const imgPreviewDiv = document.getElementById("preview");
    const file = e.target.files[0];
    const finalImage = await resizeFile(file);
    console.log("file: ", file);
    console.log(finalImage);
    const canvas = document.getElementById("my-canvas");
    const context = canvas.getContext("2d");

    const img = new Image();
    console.log("finalImage: ", finalImage);
    img.src = finalImage;
    img.onload = () => {
      context.drawImage(img, 0, 0);
      imgPreviewDiv.appendChild(img);
      imgPreviewDiv.insertAdjacentHTML(
        "beforeend",
        `<div>${file.name} ${img.width}×${img.height} ${file.type} ${Math.round(
          file.size / 1024
        )}KB<div>`
      );
      window.URL.revokeObjectURL(img.src);
    };

    // img.addEventListener("load", () => {
    //   imgPreviewDiv.appendChild(img);
    //   imgPreviewDiv.insertAdjacentHTML(
    //     "beforeend",
    //     `<div>${file.name} ${img.width}×${img.height} ${file.type} ${Math.round(
    //       file.size / 1024
    //     )}KB<div>`
    //   );
    //   window.URL.revokeObjectURL(img.src);
    //   context.drawImage(finalImage, 0, 0);
    // });

    img.src = window.URL.createObjectURL(finalImage);

    // setAddedImg(window.URL.createObjectURL(finalImage));
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
