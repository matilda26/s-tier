import React, { useRef } from "react";

import html2canvas from "html2canvas";

const Row = ({ title, bgColor }) => {
  const fileInputRef = useRef(null);
  const imageContainerRef = useRef(null);
  const rowContainerRef = useRef(null);
  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const uploadImage = async (event) => {
    const file = event.target.files[0];
    event.target.value = ""; // Reset the input after file selection

    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        imageContainerRef.current.appendChild(img);
      };
    };
    reader.readAsDataURL(file);
  };

  const downloadRow = async () => {
    const rowContainer = rowContainerRef.current;
    try {
      const rowContainerData = await html2canvas(rowContainer, {
        useCORS: true,
        logging: true,
      });
      rowContainerData.style.display = "none";
      document.body.appendChild(rowContainerData);
      const image = rowContainerData
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
      const a = document.createElement("a");
      a.setAttribute("download", `$s-tier.png`);
      a.setAttribute("href", image);
      a.click();
    } catch (error) {
      return console.error(
        "Error capturing packagingDiv with html2canvas:",
        error
      );
    }
  };

  return (
    <div className="row">
      <div className="row__inner">
        <div className="row__container" ref={rowContainerRef}>
          <div className="row__title" style={{ backgroundColor: bgColor }}>
            {title}
          </div>
          <div className="row__images" ref={imageContainerRef}></div>
        </div>
      </div>
      <button className="row__upload" onClick={handleButtonClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M8.5 1C8.5 0.723858 8.27614 0.5 8 0.5C7.72386 0.5 7.5 0.723858 7.5 1V7.5H1C0.723858 7.5 0.5 7.72386 0.5 8C0.5 8.27614 0.723858 8.5 1 8.5H7.5V15C7.5 15.2761 7.72386 15.5 8 15.5C8.27614 15.5 8.5 15.2761 8.5 15V8.5H15C15.2761 8.5 15.5 8.27614 15.5 8C15.5 7.72386 15.2761 7.5 15 7.5H8.5V1Z"
            fill="#ffffff"
          />
        </svg>
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={uploadImage}
        style={{ display: "none" }}
      />
      <button className="row__download" onClick={() => downloadRow(title)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="13"
          viewBox="0 0 18 13"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.49997 0.5C9.49997 0.223858 9.27612 0 8.99997 0C8.72383 0 8.49997 0.223858 8.49997 0.5V7.79289L6.17155 5.46447C5.97628 5.2692 5.6597 5.2692 5.46444 5.46447C5.26918 5.65973 5.26918 5.97631 5.46444 6.17157L8.64642 9.35355C8.84168 9.54882 9.15827 9.54882 9.35353 9.35355L12.5355 6.17157C12.7308 5.97631 12.7308 5.65973 12.5355 5.46447C12.3402 5.2692 12.0237 5.2692 11.8284 5.46447L9.49997 7.79289V0.5ZM1.5 7C1.5 6.72386 1.27614 6.5 1 6.5C0.723858 6.5 0.5 6.72386 0.5 7V12C0.5 12.2761 0.723858 12.5 1 12.5H17C17.2761 12.5 17.5 12.2761 17.5 12V7C17.5 6.72386 17.2761 6.5 17 6.5C16.7239 6.5 16.5 6.72386 16.5 7V11.5H1.5V7Z"
            fill="white"
          />
        </svg>
      </button>
    </div>
  );
};

export default Row;
