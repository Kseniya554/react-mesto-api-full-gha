import React, { useEffect, useState, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({isOpen, onClose, ...props}) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    // Подписка на контекст
    const currentUser = useContext(CurrentUserContext);

    // После загрузки текущего пользователя из API
    // его данные будут использованы в управляемых компонентах.
    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);
    
      function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description
        });
      }

    return (
        <PopupWithForm
            name = 'profile'
            title = 'Редактировать профиль' 
            isOpen = {isOpen}
            onClose = {onClose}
            onSubmit = {handleSubmit}
            textButton = 'Сохранить'>
                <input className="popup__name form__input" id="name-input" type="text" name="name" placeholder="Жак-Ив Кусто"  
                value={name || ''} onChange={e => setName(e.target.value)} required minLength="2" maxLength="40" />
                <span className="form__input-error error-name top" id="name-input-error" />
                <input className="popup__info form__input" id="info-input" type="text" name="info" placeholder="Исследователь океана" 
                value={description || ''} onChange={e => setDescription(e.target.value)} required minLength="2" maxLength="200" />
                <span className="form__input-error error-info error" id="info-input-error" />
        </PopupWithForm>
    )
}
export default EditProfilePopup;