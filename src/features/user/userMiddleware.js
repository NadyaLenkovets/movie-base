/** userMiddleware работает с Local Storage для зарегистрированных пользователей.
   * В Local Storage будет находиться объект зарегистрированного пользователя
   * с его именем, паролем, избранным, историей поиска. userMiddleware производит
   *  валидацию при регистрации и авторизации пользователя.
   */
export const userMiddleware = (store) => (next) => (action) => {
  let result;
  let currentStore = store.getState();
  const userObjInLocalStorage = JSON.parse(localStorage.getItem(`${currentStore.user.username}`));

  if (action.type === 'user/userSignUp' || action.type === 'user/userLogIn') {
    const usernameInLocalStorage = JSON.parse(localStorage.getItem(`${action.payload.username}`));

    // проверяем, регистрацию

    if (action.type === 'user/userSignUp') {
      if (usernameInLocalStorage) {
        result = next({ type: 'user/userSignUpError' }); // ошибка, юзер уже существует
      }
      else {
        localStorage.setItem(action.payload.username, JSON.stringify({
          username: action.payload.username,
          password: action.payload.password,
          favorites: {},
          history: {},
        }));

        result = next(action); // регистрируем нового юзера
      }
    }

    // проверяем авторизацию

    else if (action.type === 'user/userLogIn') {
      if (usernameInLocalStorage) {

        // если юзер существует и пароль совпадает
        if (usernameInLocalStorage.password === action.payload.password) {
          result = next(action); // юзер авторизовался
        }
        else {
          result = next({ type: 'user/loginErrorWrongPassword' }); // ошибка, неверный пароль
        }
      }
      else {
        result = next({ type: 'user/loginErrorUserNotRegistered' }); // ошибка, юзер еще не зарегистрирован
      }
    }
  }

  // проверяем добавление/удаление в избранное и поисковые запросы

  else if (action.type === 'user/toUserFavorites' || action.type === 'user/toUserHistory'
    || action.type === 'user/removeFromUserFavorites') {
    const favoritesObj = userObjInLocalStorage.favorites;
    const historyObj = userObjInLocalStorage.history;

    if (action.type === 'user/toUserFavorites') {
      if (!favoritesObj[action.payload]) {
        favoritesObj[action.payload] = true;
      }
    }
    else if (action.type === 'user/removeFromUserFavorites') {
      if (favoritesObj[action.payload]) {
        delete favoritesObj[action.payload];
      }
    }
    else if (action.type === 'user/toUserHistory') {
      if (!historyObj[action.payload]) {
        if ((action.payload).trim().length > 0) {
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
