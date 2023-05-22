import React, { useRef, useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const ref = useRef();

    function handleSubmit(e) {
        e.preventDefault();      
        onUpdateAvatar({
            avatar: ref.current.value /* Значение инпута, полученное с помощью рефа */
        });
      }

    return (
        <PopupWithForm 
            name = 'avatar'
            title = 'Обновить аватар'
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit={handleSubmit}
            textButton = 'Сохранить'>
                <input className="popup-avatar__input form__input" id="avatar-input" type="url" name="avatar-input" ref={ref}
                 placeholder="Ссылка на каринку" required />
                <span className="form__input-error error-link error" id="avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;