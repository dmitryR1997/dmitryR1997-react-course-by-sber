# LESSON-7

## Чеклист

### 1. Сборка приложения через esbuild (3 балла)

- [x] Tree shaking работает, неиспользуемые функции не попали в бандл — 1 балл
- [x] Применен динамический импорт (код разбит на чанки) — 1 балл
- [x] Сборка завершена с minify и sourcemap — 1 балл

### 2. Сборка библиотеки через esbuild (3 балла)

- [x] React и другие библиотеки исключены через external — 1 балл
- [x] Сборка в esm и cjs — 1 балл
- [x] Сборка каждого entry point выполнена корректно — 1 балл

### 3. Конфигурация production и dev-сборки (3 балла)

- [x] dev-сборка работает с watch и без minify — 1 балл
- [x] prod-сборка работает с minify, sourcemap, tree shaking — 1 балл
- [x] Студент понимает, как переключаться между режимами — 1 балл

### Дополнительная задача 1. Сборка библиотеки через swc (1.5 балла)

- [x] swc корректно обрабатывает TypeScript — 0.5 балла
- [x] Собраны оба формата, es6 и commonjs — 0.5 балла
- [x] В конфигурации есть minify и sourceMaps — 0.5 балла

### Дополнительная задача 2. Code splitting на основе маршрутов (1.5 балла)

- [x] Динамический импорт работает — 0.5 балла
- [x] Каждая страница собирается в отдельный чанк — 0.5 балла
- [x] Неиспользуемые маршруты не загружаются на старте — 0.5 балла

## Что сделано

### 1. Сборка приложения через esbuild

- Сборка из app/index.ts конфигом configs/esbuild.app.config.ts: bundle, minify, sourcemap, результат в dist/app.js рядом с app.js.map
- В app/utils.ts три экспорта, в index.ts используется только formatPrice и formatDate, соответсвенно его нет в сборке, трешейкинг рабртает
- Вне ТЗ добавлен анализатор, npm run analyze прогоняет оба конфига, для удобства проверки что попадает в бандл

### 2. Сборка библиотеки через esbuild

- Три entry point lib/index.ts, lib/math.ts, lib/string.ts собираются конфигом configs/esbuild.lib.config.ts
- Два прохода build: esm в dist/lib/esm, cjs в dist/lib/cjs
- реакт и лодаш вынесены в external, в выводе остались иморты на них, код зависимостей отсутсвует

### 3. Конфигурация production и dev-сборки

- Режим переключается флагом CLI: npm run dev это тот же конфиг с --dev, npm run build:app без флага дает prod
- dev собирает через context и watch, без minify и без sourcemap, пересборка занимает около секунды
- prod собирает через build с minify и sourcemap, рядом с app.js лежит app.js.map
- Трешейкинг работает в обоих режимах

### Дополнительная задача 1. Сборка библиотеки через swc

- Два конфига configs/swc.esm.json и configs/swc.cjs.json, отличаются только module.type: es6 и commonjs
- В обоих minify и sourceMaps, парсер typescript, вывод в dist/lib-swc/esm и dist/lib-swc/cjs
- swc транспилирует пофайлово, поэтому импорты реакта и лодаша остаются внешними

### Дополнительная задача 2. Code splitting на основе маршрутов

- app/routes.ts возвращает страницы через импорт, сами страницы в app/pages/home.ts и app/pages/about.ts
- В конфиге приложения outfile заменен на outdir с entryNames app, добавлены splitting и формат esm
- Каждая страница попадает в свой чанк
- На старте грузится только home, в about стоит console.log и он не выводится

## Запуск

Установка зависимостей:
npm ci

Сборка приложения, prod:
npm run build:app

Сборка приложения, dev с watch:
npm run dev

Сборка библиотеки через esbuild:
npm run build:lib

Сборка библиотеки через swc:
npm run build:lib:swc

Результат сборки:
dist/app.js и dist/app.js.map

Запуск собранного бандла:
node dist/app.js
