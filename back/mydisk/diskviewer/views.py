import requests
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

YANDEX_API_BASE_URL = "https://cloud-api.yandex.net/v1/disk/public/resources?public_key="


class YandexDiskView(APIView):
    def post(self, request):
        # Получаем ссылку из запроса
        public_link = request.data.get('public_link')
        if not public_link:
            return Response({"error": "No public link provided"}, status=status.HTTP_400_BAD_REQUEST)

        # Получаем публичный ключ из ссылки
        try:
            public_key = self.extract_public_key(public_link)
        except ValueError:
            return Response({"error": "Invalid public link"}, status=status.HTTP_400_BAD_REQUEST)

        # Отправляем запрос к API Яндекс.Диска
        response = requests.get(YANDEX_API_BASE_URL + public_key, headers={'Authorization': 'OAuth y0_AgAAAAAjVB8oAAxubQAAAAEQxSZtAADHnKHgk-5AiIwanw0FyxGFOyyCa'})
        if response.status_code == 200:
            data = response.json()
            return Response(data)
        else:
            return Response({"error": "Failed to retrieve data from Yandex.Disk"}, status=response.status_code)

    def extract_public_key(self, public_link):
        # Простой метод для извлечения ключа из публичной ссылки
        if "https://disk.yandex.ru/d/" in public_link:
            return public_link
        else:
            raise ValueError("Invalid link format")
