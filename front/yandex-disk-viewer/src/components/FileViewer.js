// src/components/FileViewer.js
import React from 'react';
import { useSelector } from 'react-redux';

const FileViewer = () => {
    const { loading, files, error } = useSelector((state) => state.files);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>Ошибка: {error}</p>;
    if (!files) return <p>Нет данных для отображения.</p>;

    return (
        <div>
            <h2>Файлы с Яндекс.Диска:</h2>
            <ul>
                {files._embedded.items.map((file) => (
                    <li key={file.resource_id}>
                        {file.name} - {file.type === 'dir' ? 'Папка' : 'Файл'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FileViewer;
