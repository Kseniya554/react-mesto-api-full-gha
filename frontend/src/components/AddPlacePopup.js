import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, ...props}) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen])

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({
            name: name,
            link: link
        });
      }

    return(
        <PopupWithForm
            name = 'card'
            title = 'Новое место'             
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            textButton = 'Создать'>
                <input className="popup-plus__name form__input" id="place-input" type="text" name="place_input" placeholder="Название" 
                value={name || ''} onChange={e => setName(e.target.value)} required minLength="1" maxLength="30" />
                <span className="form__input-error error-place top" id="place-input-error"></span>
                <input className="popup-plus__info form__input" id="url-input" type="url" name="url_input" placeholder="Ссылка на картинку" 
                value={link || ''} onChange={e => setLink(e.target.value)} required />
                <span className="form__input-error error-link error" id="url-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;