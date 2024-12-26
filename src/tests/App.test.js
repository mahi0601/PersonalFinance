import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; 
import App from '../App';

describe('App Component', () => {
    test('renders App component without crashing', () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    });

    test('renders login page by default when not authenticated', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );

        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });
});
