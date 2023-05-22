import React from 'react';

function ImagePopup({isOpen, onClose, card}) {
  return (
    <div className={`popup-modal popup-image ${isOpen ? 'popup__is-opened' : ''}`}>
        <div className="popup-image__opened">
            <button className="close-button" type="button" name="close-button" onClick={onClose}></button>
            <figure className="popup-image__container">
                <img className="popup-image__big" src={card.link} alt={card.name} />
                <figcaption className="popup-image__text">{card.name}</figcaption>
            </figure>
        </div>        
    </div>
  );
}

export default ImagePopup;