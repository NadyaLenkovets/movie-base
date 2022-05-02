# Movie Base

### branch1

- Добавила папки common, features, components, images.
- Подключила redux toolkit.
- В папку components добавила основные компоненты.
- Сделала переходы по страницам.
- В папке features создала store, и папку movies cо слайсом movieSlice.js.
- Компонент Movies работает со store.
- Компоненты Login и Sign-Up работают пока через компонент App, но это переделаю.
- Карточка отдельного фильма открывается. Кнопка добавления в избранные еще не работает.
- Добавила ErrorBoundaries.
- Компоненты Favorites и History пока заглушки.
- Поиск пока не работает.


### branch2

- Сделала поиск по нажатию на кнопку.
- Добавила фильтры фильмы/сериалы.
- Добавила компонент SearchList.
- Добавила смену темы в компоненте MovieDetails с помощью контекста.
- В папку common добавила кастомный хук useFetch.


### branch3

- Переделала регистрацию и авторизацию пользователя через мидлвару.
- В папку features добавила папку user с userSlice.js и userMiddleware.js.


### branch4

- В userMiddleware добавила обработку избранного и истории поиска.
- Доделала компоненты Favorites, History.
- Добавила новый компонент FavoritesCard.
- Вынесла кнопку перехода на предыдущую страницу в отдельный компонент GoBack.


### branch5

- Доработала userMiddleware.
- Добавила динамический поиск и компонент DynamicSearch.
- Создала moviesAPI с запросами RTK Query и Transforming Responses.
- Удалила moviesSlice, т.к. он больше не используется.
- Рефакторинг кода.
