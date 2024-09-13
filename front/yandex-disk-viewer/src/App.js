// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './app/store';
import LinkInput from './components/LinkInput';
import FileViewer from './components/FileViewer';

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <h1>Просмотр файлов с Яндекс.Диска</h1>
                <LinkInput />
                <FileViewer />
            </div>
        </Provider>
    );
};

export default App;
