// import axios from 'axios';

// export const AuthService = {
//     login: async (email, password) => {
//         try {
//             const response = await axios.post("https://sejiwa.onrender.com/api/login",
//                 { email, password },
//                 {
//                     withCredentials: true,
//                     headers: { "Content-Type": "application/json" }
//                 }
//             );

//             localStorage.setItem('access_token', response.access_token);
//             localStorage.setItem('refresh_token', response.refresh_token);
            
//             console.log(response.data)

//             return response.data;
//         } catch (error) {
//             console.error("Login error:", error.response?.data || error.message);
//             throw new Error(error.response?.data?.message || 'Login failed');
//         }
//     },

//     logout: () => {
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('refresh_token');
//         window.location.href = '/';
//     },

//     getAccessToken: () => localStorage.getItem('access_token'),

//     isTokenExpired: (token) => {
//         if (!token || token.split('.').length !== 3) {
//             console.error(" Invalid token format:", token);
//             return true;
//         }

//         try {
//             const payload = JSON.parse(atob(token.split('.')[1]));
//             return payload.exp * 1000 < Date.now();
//         } catch (error) {
//             console.error(" Error decoding token:", error);
//             return true;
//         }
//     },

//     refreshToken: async () => {
//         try {
//             const refreshToken = localStorage.getItem('refresh_token');
//             const response = await axios.post(`${API_URL}/refresh`, { refresh_token: refreshToken });
//             localStorage.setItem('access_token', response.data.access_token);
//             return response.data.access_token;
//         } catch (error) {
//             console.error('Token refresh failed:', error);
//             AuthService.logout();
//             return null;
//         }
//     },

//     getAuthHeaders: async () => {
//         let token = AuthService.getAccessToken();
//         if (AuthService.isTokenExpired(token)) {
//             token = await AuthService.refreshToken();
//         }
//         return { Authorization: `Bearer ${token}` };
//     }
// };

import axios from 'axios';

const API_URL = "https://sejiwa.onrender.com";

export const AuthService = {
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, 
        { email, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      const jwtToken = response.data.token;              // JWT token
      
    //   const apiKey = response.data.access_token;         // API key (bukan JWT)
      const refreshToken = response.data.refresh_token || response.data.refresh;  // Refresh token

      localStorage.setItem('token', jwtToken);
    //   localStorage.setItem('access_token', apiKey);
      localStorage.setItem('refresh_token', refreshToken);

      console.log('Login response:', response.data);
      return response.data;
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  },

  getToken: () => localStorage.getItem('token'),

//   getApiKey: () => localStorage.getItem('access_token'),

  isTokenExpired: (token) => {
    if (!token || token.split('.').length !== 3) {
      console.error("Invalid token format:", token);
      return true;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch (error) {
      console.error("Error decoding token:", error);
      return true;
    }
  },

  refreshToken: async () => {
    try {
      const refreshToken = localStorage.getItem('refresh_token');
      const response = await axios.post(`${API_URL}/api/refresh`, { refresh_token: refreshToken });

      const newJwt = response.data.token;
      localStorage.setItem('token', newJwt);
      return newJwt;
    } catch (error) {
      console.error('Token refresh failed:', error);
      AuthService.logout();
      return null;
    }
  },

  getAuthHeaders: async () => {
    let token = AuthService.getToken();
    if (AuthService.isTokenExpired(token)) {
      token = await AuthService.refreshToken();
    }
    return { Authorization: `Bearer ${token}` };
  }
};
