# Используем Node.js как базовый образ
FROM node:14

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект
RUN npm run build

# Открываем порт для фронтенда
EXPOSE 3000

# Запускаем сервер
CMD ["npm", "start"]
