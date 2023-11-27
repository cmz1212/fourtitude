import React from "react";

export default function StatsPopupIcon ({ onClick }) {
  return (
    <button id="popup-button" onClick={onClick}>
      Click Me to Toggle Stats !
    </button>
  );
}