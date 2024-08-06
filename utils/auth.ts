import {jwtDecode} from 'jwt-decode';

// Check if the user is authenticated by verifying if a token exists in local storage
export const isAuthenticated = (): boolean => {
    if (typeof window === 'undefined') {
        return false; // If it's SSR, return false
    }

    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        const decoded = jwtDecode<{ exp: number }>(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime;
    } catch (error) {
        console.error('Token decoding error:', error);
        return false;
    }
};
