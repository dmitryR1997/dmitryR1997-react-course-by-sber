# LESSON-3 RTK Query

## Чеклист

### 1. Создание API-модуля через RTK Query (3 балла)

- [x] API корректно описан и экспортирует хук useGetTasksQuery — 1 балл
- [x] Загрузка задач происходит без ошибок — 1 балл
- [x] Используется transformResponse для получения массива — 1 балл (Отошел от ТЗ, скорректировал, поясню в что сделано)

### 2. Отображение задач в интерфейсе (3 балла)

- [x] Реализован хук useTasks, в котором данные загружаются через useGetTasksQuery — 1 балл
- [x] Задачи отображаются в интерфейсе — 1 балл
- [x] Код структурирован и соответствует FSD — 1 балл

### 3. Локальное удаление задачи (3 балла)

- [x] Использован useEffect для загрузки данных в useState — 1 балл
- [x] Реализована функция removeTask — 1 балл
- [x] После удаления задача исчезает из UI — 1 балл

### Дополнительная задача (3 бонусных балла)

- [x] baseApi создан и экспортирован из shared/api/baseApi.ts, tagTypes включает Tasks — 1 балл
- [x] tasksApi использует injectEndpoints от baseApi, getTasks возвращает Task[] — 1 балл
- [x] в store подключены baseApi.reducer и baseApi.middleware один раз — 1 балл

## Что сделано

### 1. Подключение RTK Query и создание tasksApi

- Установлены @reduxjs/toolkit и react-redux, базовый URL вынесен в shared/config/api.ts
- Стор подключён в app/store.ts, приложение обёрнуто в Provider
- В entities/task/api/tasksApi.ts реализован хук useGetTasksQuery, настроены reducerPath, baseQuery и tagTypes (позже вынесено в общий baseApi, см. доп. задачу)
- - Вне ТЗ, создана сущность TaskDto, в целом это хороший тон для FSD, где то в апи хранить конракты как приходят с сервера, так как они != той модели что мы определяем в entity/*/model, условные DTO -> Entity, а их преобразование как раз происходит в transformResponse, маппер вынес в lib

### 2. Отображение задач

- Хук useTasks загружает задачи через useGetTasksQuery и копирует их в локальное состояние
- Копирование в стейт по флагу isSuccess через useEffect
- TaskWidget обрабатывает состояния isLoading и isError, задачи передаёт в TaskList

### 3. Удаление задач

- В целом ничего не делали, все отработало после выполнения пункта 2

### Дополнительная задача

- Единый экземпляр RTK Query вынесен в shared/api/baseApi.ts: reducerPath 'api', базовый baseUrl, tagTypes ['Tasks'] и пустые endpoints
- tasksApi переписан на baseApi.injectEndpoints, эндпоинт getTasks добавляется в общий api, собственный reducerPath больше не нужен
- В store один раз подключены baseApi.reducer (по ключу baseApi.reducerPath) и baseApi.middleware, единый reducerPath и middleware на всё приложение
- Эндпоинты инжектятся при импорте модуля tasksApi, RTK Query поддерживает инъекцию после создания стора

## Запуск

Установка зависимостей:
npm ci

Запуск dev сервера:
npm run dev

Сборка проекта:
npm run build

Проверка линтера:
npm run lint
