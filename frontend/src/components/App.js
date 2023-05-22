import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom"; // импортируем Routes
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ProtectedRoute from "./ProtectedRoute"; // импортируем HOC
import auth from "../utils/Auth";
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import imageOk from '../images/success.svg';
import imageError from '../images/Error.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedCard, setSelectedCard] = useState({});
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ password: "", email: "" });
  const [registered, setRegistered] = useState(false);
  const [infoTooltipText, setInfoTooltipText] = useState('');
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupOpen] = useState(false);
  // const [infoToolTipData, setInfoToolTipData] = useState({ isOpen:false, status:false, text:'' })

  function tockenCheck() {
    // если у пользователя есть токен в localStorage,
    // эта функция проверит валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // проверим токен
      auth.getContent(jwt)
        .then((response) => {
          // авторизуем пользователя
          setLoggedIn(true);
          setUserData({
            email: response.email,
          });
          navigate('/');
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getNeededAll()
        .then((result) => {
          const [dataForUserInfo, dataForInitialCards] = result;
          setCurrentUser(dataForUserInfo);
          setCards(dataForInitialCards);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    tockenCheck();
  }, [navigate]);

  // function tockenCheck() {
  //   // если у пользователя есть токен в localStorage,
  //   // эта функция проверит валидность токена
  //   const jwt = localStorage.getItem('jwt');
  //   if (jwt) {
  //     // проверим токен
  //     auth.getContent(jwt)
  //       .then((response) => {
  //         // авторизуем пользователя
  //         setLoggedIn(true);
  //         setUserData({
  //           email: response.email,
  //         });
  //         navigate('/');
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }

  function userRegister({password, email}) {
    auth.register({password, email})
    .then(() => {
      setRegistered(true);
      setInfoTooltipText('Вы успешно зарегистрировались!');
      setInfoTooltipPopupOpen(true);
      navigate('/sign-in');
    })
    .catch((error) => {
      setRegistered(false);
      setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
      setInfoTooltipPopupOpen(true);
      console.log(error);
    })
  }

  function userLogin({password, email}) {
    auth.authorize({password, email})
    .then((response) => {
      // console.log(response);
        localStorage.setItem('jwt', response.token);
        setLoggedIn(true);
        setUserData({
          password: password,
          email: email
        });
        navigate('/');
    })
    .catch((error) => {
      // setInfoToolTipData({
      //   isOpen:true, 
      //   status:false, 
      //   text:'Что-то пошло не так! Попробуйте ещё раз.'
      // })
      setRegistered(false);
      setInfoTooltipText('Что-то пошло не так! Попробуйте ещё раз.');
      setInfoTooltipPopupOpen(true);
      console.log(error);
    })
  }

  function handleSignOut () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    setUserData({password: '', email: ''});
    navigate('/sign-in');
  }

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard({});
    setInfoTooltipPopupOpen(false);
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleCardClick({ name, link }) {
    setSelectedCard({ name, link });
    setIsImagePopupOpen(true);
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleDeleteClick(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .patchUserInfo({ name, about })
      .then((userProfile) => {
        setCurrentUser(userProfile);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api
      .postNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          {/* ниже разместим защищённые маршруты */}
          {/* и передадим несколько пропсов: loggedIn, path, component */}
          <Route exact path='/'
            element={
              <>
                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Header}
                  headerText='Выйти'
                  linkTo={'/sign-in'}
                  userEmail={userData.email}
                  signOut={handleSignOut} />

                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Main}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleDeleteClick} />

                <ProtectedRoute
                  loggedIn={loggedIn}
                  element={Footer} />
              </>
            }
          />
           <Route path='/sign-up'
            element={
              <>
                <Header
                  headerText={'Войти'}
                  linkTo={'/sign-in'}
                  userEmail='' />
                <Register isLoggedId={loggedIn} onRegister={userRegister}/>
              </>
            }
          />

          <Route path='/sign-in'
            element={
            <>
              <Header
                headerText={'Регистрация'}
                linkTo={'/sign-up'}
                userEmail=''/>
              <Login onLoginUser={userLogin} />
            </>

            }
          />
          <Route
            path='*'
            element={loggedIn ? <Navigate to='/' /> : <Navigate to='/sign-in' />}
          />
        </Routes>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isOpen={isImagePopupOpen}
        />

        <InfoTooltip
          // infoToolTipData={({isOpen:true, 
          //   text:''})}
          isOpen={isInfoTooltipPopupOpen}
          title={infoTooltipText}
          onClose={closeAllPopups}
          image={registered ? imageOk : imageError}/>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
