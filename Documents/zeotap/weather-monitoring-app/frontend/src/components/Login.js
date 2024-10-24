import React from 'react';
import './Login.css'; // Make sure the case matches the file name

const Login = () => {
    return (
        <div className="login-container">
            <h2>Login</h2>
            <form>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    );
};

export default Login;
