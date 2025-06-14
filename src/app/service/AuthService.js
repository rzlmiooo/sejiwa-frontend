import axios from 'axios';

export const AuthService = {
    login: async (email, password) => {
        try {
            const response = await axios.post("https://sejiwa.onrender.com/api/login",
                { email, password },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            console.log(response.data)

            return response.data;
        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    logout: () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
    },

    getAccessToken: () => localStorage.getItem('access_token'),

    isTokenExpired: (token) => {
        if (!token || token.split('.').length !== 3) {
            console.error(" Invalid token format:", token);
            return true;
        }

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            console.error(" Error decoding token:", error);
            return true;
        }
    },

    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refresh_token');
            const response = await axios.post(`${API_URL}/refresh`, { refresh_token: refreshToken });
            localStorage.setItem('access_token', response.data.access_token);
            return response.data.access_token;
        } catch (error) {
            console.error('Token refresh failed:', error);
            AuthService.logout();
            return null;
        }
    },

    getAuthHeaders: async () => {
        let token = AuthService.getAccessToken();
        if (AuthService.isTokenExpired(token)) {
            token = await AuthService.refreshToken();
        }
        return { Authorization: `Bearer ${token}` };
    }
};
