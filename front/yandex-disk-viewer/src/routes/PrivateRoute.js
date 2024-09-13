import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component }) => {
    const authState = useSelector((state) => state.auth); // Получение всего состояния auth
    const { accessToken } = authState; // Деструктуризация accessToken из состояния

    return accessToken ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;
