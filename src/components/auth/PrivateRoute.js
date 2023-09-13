// src/components/auth/PrivateRoute.js

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
    const { authToken } = useContext(AuthContext);

    if (!authToken) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
