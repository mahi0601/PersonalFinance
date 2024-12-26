// Import jest-dom for extended DOM assertions
import '@testing-library/jest-dom';

// Optional: Add global configuration for testing (e.g., mocking)

// Example: Mocking matchMedia if you're testing components that use media queries
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});
