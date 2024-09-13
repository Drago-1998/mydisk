// src/components/LinkInput.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchFiles } from '../features/filesSlice';

const LinkInput = () => {
    const [link, setLink] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (link) {
            dispatch(fetchFiles(link));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Введите публичную ссылку Яндекс.Диска"
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <button type="submit">Получить файлы</button>
        </form>
    );
};

export default LinkInput;
