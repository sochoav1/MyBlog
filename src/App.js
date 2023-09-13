import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AddPost from './components/AddPost';
import PostList from './components/PostList';
import Login from './components/auth/Login';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <h1>My Blog</h1>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/" element={
                            <PrivateRoute>
                                <AddPost />
                                <PostList />
                            </PrivateRoute>
                        } />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
