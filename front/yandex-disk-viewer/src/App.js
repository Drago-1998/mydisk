import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './app/store';
import Login from './components/Login';
import PrivateRoute from "./routes/PrivateRoute";
import Main from "./components/Main";

const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Routes>
                        <Route path="/" element={<PrivateRoute component={Main} />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </Provider>
    );
};

export default App;
