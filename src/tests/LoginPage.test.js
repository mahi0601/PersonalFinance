import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext'; 
import LoginPage from '../pages/LoginPage';
import axios from '../utils/api';

jest.mock('../utils/api'); 

describe('LoginPage Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders login form elements correctly', () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </AuthProvider>
        );

        // Check form elements
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    test('updates input fields on user interaction', () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </AuthProvider>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(usernameInput.value).toBe('testuser');
        expect(passwordInput.value).toBe('password123');
    });

    test('displays error when username or password is missing', async () => {
        render(
            <AuthProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </AuthProvider>
        );

        const loginButton = screen.getByText('Login');
        fireEvent.click(loginButton);

        expect(await screen.findByText('Both username and password are required')).toBeInTheDocument();
    });

    test('calls API and navigates to dashboard on successful login', async () => {
        const mockResponse = {
            data: { user_id: '123', role: 'user' },
        };
        axios.post.mockResolvedValueOnce(mockResponse);

        render(
            <AuthProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </AuthProvider>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                '/auth/login',
                null,
                expect.objectContaining({
                    params: { username: 'testuser', password: 'password123' },
                    withCredentials: true,
                })
            );
        });
    });

    test('displays error message on failed login', async () => {
        axios.post.mockRejectedValueOnce({
            response: { data: { detail: 'Invalid credentials' } },
        });

        render(
            <AuthProvider>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </AuthProvider>
        );

        const usernameInput = screen.getByPlaceholderText('Username');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
        fireEvent.click(loginButton);

        expect(await screen.findByText('Invalid credentials')).toBeInTheDocument();
    });
});
