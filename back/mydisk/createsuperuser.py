import os
from django.contrib.auth import get_user_model

User = get_user_model()

# Получаем данные из переменных окружения
username = 'admin'
email = 'ad@ad.ad'
password = 'admin'

if username and email and password:
    if not User.objects.filter(username=username).exists():
        print(f'Создание суперпользователя {username}...')
        User.objects.create_superuser(username=username, email=email, password=password)
        print('Суперпользователь создан успешно.')
    else:
        print(f'Суперпользователь с именем {username} уже существует.')
else:
    print('Переменные окружения для суперпользователя не заданы.')