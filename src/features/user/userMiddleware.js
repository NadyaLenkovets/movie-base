export const userMiddleware = (store) => (next) => (action) => {
  let currentStore = store.getState();
  let result;

  if (action.type === 'user/userSignUp') {// проверяем, регистрацию

    if (JSON.parse(localStorage.getItem(`${action.payload.username}`))) {

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
    if (JSON.parse(localStorage.getItem(`${action.payload.username}`))) {
      // если юзер существует, проверяем пароль
      // если пароль совпадает
      if (JSON.parse(localStorage.getItem(`${action.payload.username}`)).password === action.payload.password) {
        result = next(action); // юзер авторизовался
      }

      else {
        result = next({ type: 'user/loginErrorWrongPassword' }); // ошибка, неверный пароль
      }

    } else {
      result = next({ type: 'user/loginErrorUserNotRegistered' }); // ошибка, юзер еще не зарегистрирован
    }
  }

  else if (action.type === 'user/toUserFavorites') {
    let favArr = JSON.parse(localStorage.getItem(`${currentStore.user.username}`)).favorites; //! заменить на объект

    if (!favArr.includes(action.payload)) {
      favArr.push(action.payload);
    }

    localStorage.setItem(currentStore.user.username, JSON.stringify({
      username: currentStore.user.username,
      password: currentStore.user.userPassword,
      favorites: favArr,
      history: [],
    }));

    result = next(action);
  }

  else {
    result = next(action);
  }

  return result;
}
