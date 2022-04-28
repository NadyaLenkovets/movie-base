export const userMiddleware = (store) => (next) => (action) => {
  let currentStore = store.getState();
  const usernameInLocalStorage = JSON.parse(localStorage.getItem(`${action.payload.username}`));
  const userObjInLocalStorage = JSON.parse(localStorage.getItem(`${currentStore.user.username}`));
  let result;

  if (action.type === 'user/userSignUp') {// проверяем, регистрацию

    if (usernameInLocalStorage) {

      result = next({ type: 'user/userSignUpError' }); // ошибка, юзер уже существует
    } else {
      localStorage.setItem(action.payload.username, JSON.stringify({
        username: action.payload.username,
        password: action.payload.password,
        favorites: {},
        history: {},
      }));

      result = next(action); // регистрируем нового юзера
    }
  }

  else if (action.type === 'user/userLogIn') { // проверяем авторизацию
    if (usernameInLocalStorage) {
      // если юзер существует, проверяем пароль
      // если пароль совпадает
      if (usernameInLocalStorage.password === action.payload.password) {
        result = next(action); // юзер авторизовался
      }

      else {
        result = next({ type: 'user/loginErrorWrongPassword' }); // ошибка, неверный пароль
      }

    } else {
      result = next({ type: 'user/loginErrorUserNotRegistered' }); // ошибка, юзер еще не зарегистрирован
    }
  }

  else if (action.type === 'user/toUserFavorites' || action.type === 'user/toUserHistory') {
    const favoritesObj = userObjInLocalStorage.favorites;
    const historyObj = userObjInLocalStorage.history;

    if (action.type === 'user/toUserFavorites') {
      if (!favoritesObj[action.payload]) {
        favoritesObj[action.payload] = true;
      }
    } else if (action.type === 'user/toUserHistory') {
      if (!historyObj[action.payload]) {
        if ((action.payload).trim().length > 0) { //! проверка regexp
          historyObj[action.payload] = true;
        }
      }
    }

    localStorage.setItem(currentStore.user.username, JSON.stringify({
      username: currentStore.user.username,
      password: currentStore.user.userPassword,
      favorites: favoritesObj,
      history: historyObj,
    }));

    result = next(action);
  }

  else {
    result = next(action);
  }

  return result;
}
