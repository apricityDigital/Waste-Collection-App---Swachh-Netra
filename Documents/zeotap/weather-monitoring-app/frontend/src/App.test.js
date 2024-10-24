import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// These are automatically available if you're using Jest with Create React App
describe('App component', () => {
    test('renders the weather forecast title', () => {
        render(<App />);
        const titleElement = screen.getByText(/weather forecast/i);
        expect(titleElement).toBeInTheDocument();
    });
    test('renders weather app title', () => {
        render(<App />);
        const linkElement = screen.getByText(/weather app/i);
        expect(linkElement).toBeInTheDocument();
      });

    test('renders login button', () => {
        render(<App />);
        const loginButton = screen.getByText(/login/i);
        expect(loginButton).toBeInTheDocument();
    });

    // Add more tests as needed
});

