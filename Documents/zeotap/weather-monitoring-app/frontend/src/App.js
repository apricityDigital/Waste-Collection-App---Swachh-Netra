import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Weather from './components/Weather';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.test';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Weather />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </Router>
    );
};

export default App;
