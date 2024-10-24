import React from 'react';
import './Signup.css'; // Make sure the case matches the file name

const Signup = () => {
    return (
        <div className="signup-container">
            <h2>Signup</h2>
            <form>
                <input type="text" placeholder="Username" required />
                <input type="password" placeholder="Password" required />
                <button type="submit">Signup</button>
            </form>
            <p>Already have an account? <a href="/login">Login</a></p>
        </div>
    );
};

export default Signup;
