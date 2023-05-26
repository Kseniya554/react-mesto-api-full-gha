import React, { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from './Card';
import api from '../utils/api';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, onImagePopup, cards, onCardLike, onCardDelete}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="content">
      <section className="profile">
        <button className="profile__logo-hover" onClick={onEditAvatar} >
            <img className="profile__logo" src={currentUser.avatar} alt="аватар" />
        </button>
        <div className="profile__info">
            <div className="profile__navigation">
                <h1 className="profile__title">{currentUser.name}</h1>
                <button type="button" className="profile__open-popup" onClick={onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__button" onClick={onAddPlace}></button>                      
      </section>
      <section className="elments" id="cards">
        {
          cards.map((card) => {
             return((<Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onImagePopup={onImagePopup}                
                handleLikeClick={onCardLike}
                handleDeleteClick={onCardDelete}
              />
            ))}
          )}    
    
      </section>
    </div>
  );
}

export default Main;