# Используем базовый образ Node.js для сборки Vue.js приложения
FROM node:16-alpine as build-stage

# Устанавливаем рабочую директорию в контейнере
WORKDIR /app

# Копируем package.json и package-lock.json в контейнер
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы в контейнер
COPY . .

# Собираем Vue.js приложение для продакшн
RUN npm run build

# Используем базовый образ Nginx для сервера
FROM nginx:alpine as production-stage

# Копируем файлы собранного приложения из build-stage в директорию Nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Копируем основной файл конфигурации Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Копируем файл конфигурации виртуального хоста
COPY vue-app.conf /etc/nginx/conf.d/default.conf

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]