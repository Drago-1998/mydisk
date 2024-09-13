import React, {useState} from 'react';
import {useSelector} from 'react-redux';

const FileViewer = () => {
  const {loading, files, error} = useSelector((state) => state.files);
  const [selectedFiles, setSelectedFiles] = useState([]);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {JSON.stringify(error)}</p>;
  if (!files) return <p>Нет данных для отображения.</p>;

  // Функция для обработки изменения выбранного файла
  const handleSelectFile = (file) => {
    if (selectedFiles.includes(file)) {
      setSelectedFiles(selectedFiles.filter(f => f !== file));
    } else {
      setSelectedFiles([...selectedFiles, file]);
    }
  };

  // Функция для скачивания выбранных файлов
  const downloadSelectedFiles = async () => {
    for (const file of selectedFiles) {
      const link = document.createElement('a');
      link.href = file.file;  // Ссылка на скачивание файла
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      await new Promise(resolve => setTimeout(resolve, 1000));  // Ожидание 1 сек между скачиваниями
    }
  };

  return (
    <div>
      <h2>Файлы с Яндекс.Диска:</h2>
      <ul>
        {files._embedded.items.map((file) => (
          <li key={file.resource_id}>
              <input
                type="checkbox"
                onChange={() => handleSelectFile(file)}
                checked={selectedFiles.includes(file)}
                disabled={!file.file}  // Отключить чекбокс, если это папка или файл не доступен для скачивания
              />
            {file.name} - {file.type === 'dir' ? 'Папка' : 'Файл'}
            {file.file && (
              <a href={file.file} download>
                <button>Скачать</button>
              </a>
            )}
          </li>
        ))}
      </ul>
      {selectedFiles.length > 0 && (
        <button onClick={downloadSelectedFiles}>Скачать выбранные файлы ({selectedFiles.length})</button>
      )}
    </div>
  );
};

export default FileViewer;
