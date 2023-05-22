import React from 'react';

function PopupWithForm({name, title, isOpen, children, onClose, textButton, onSubmit}) {
    
    return (
        <div className={`popup popup_type_${name} ${isOpen ? 'popup__is-opened' : ''}`}>
            <div className={`popup__form form`}> 
                <h3 className="popup__title">{title}</h3>
                <form className={`popup__container_type_${name} form__set`} name={`_type_${name}-form`} onSubmit={onSubmit}>
                    {children}
                    <button className="close-button" type="button" name="close-button" onClick={onClose}></button>
                    <button className="popup__submit-button form__submit" type="submit" name="submit-button">{textButton}</button>
                </form>
            </div>
        </div>
    );
  }
  
  export default PopupWithForm;