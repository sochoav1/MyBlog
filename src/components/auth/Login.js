// Login.js
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
///AXIOS USES
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        // Token ha expirado o es inválido
        localStorage.removeItem('authToken');
        // Aquí puedes añadir lógica adicional, como mostrar un mensaje de error
    }
    return Promise.reject(error);
});


function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const { setAuthToken } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username,
                password
            });
    
            const token = response.data.token;
            localStorage.setItem('authToken', token);
            setAuthToken(token);
            navigate('/');
            

    
            // Aquí, después de un inicio de sesión exitoso, puedes redirigir al usuario a la página principal.
            // Esto se puede hacer usando el hook `useNavigate` de `react-router-dom`.
    
        } catch (error) {
            console.error("Error durante el inicio de sesión:", error);
            setError("Error en el inicio de sesión. Por favor, verifica tus credenciales.");
        }
    };
    

    ///
    
    ///
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
    
}
export default Login;
