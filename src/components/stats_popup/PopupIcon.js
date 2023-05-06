import React from "react";

const PopupIcon = ({ onClick }) => {
  return (
    <button id="popup-button" onClick={onClick}>
      Click Me to Toggle Stats !
    </button>
  );
};

export default PopupIcon;
