# Используем Python как базовый образ
FROM python:3.11-slim

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы проекта
COPY . /app/

# Устанавливаем зависимости
RUN pip install --no-cache-dir -r req.txt

# Открываем порт для доступа
EXPOSE 8000

ENTRYPOINT ["sh", "-c", "python manage.py migrate && python manage.py shell < createsuperuser.py && python manage.py runserver 0.0.0.0:8000"]

