import React from "react";

function InfoTooltip({ isOpen, title, onClose, image }) {
  return (
    <div className={`popup ${isOpen ? "popup__is-opened" : ""}`}>
      <div className="infotooltip">
          <img className="infotooltip__image" src={image} />
        <h2 className="infotooltip__title">{title}</h2>
        <button className="close-button" type="button" name="close-button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default InfoTooltip;
