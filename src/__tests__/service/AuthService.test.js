import { AuthService } from '@/app/service/AuthService';
import axios from 'axios';

jest.mock('axios');

describe('AuthService Suite', () => {
  beforeEach(() => {
    // Clear localStorage mock
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('isTokenExpired', () => {
    test('should return true for invalid token formats', () => {
      expect(AuthService.isTokenExpired('')).toBe(true);
      expect(AuthService.isTokenExpired('invalid-token')).toBe(true);
    });

    test('should return true for expired tokens', () => {
      // Mock base64 encoding for expired token
      const expiredPayload = { exp: Math.floor(Date.now() / 1000) - 3600 }; // 1 hour ago
      const token = `header.${btoa(JSON.stringify(expiredPayload))}.signature`;
      expect(AuthService.isTokenExpired(token)).toBe(true);
    });

    test('should return false for valid future tokens', () => {
      // Mock base64 encoding for future token
      const futurePayload = { exp: Math.floor(Date.now() / 1000) + 3600 }; // 1 hour from now
      const token = `header.${btoa(JSON.stringify(futurePayload))}.signature`;
      expect(AuthService.isTokenExpired(token)).toBe(false);
    });

    test('should return true if token parsing fails', () => {
      const brokenToken = 'header.brokenbase64payload.signature';
      expect(AuthService.isTokenExpired(brokenToken)).toBe(true);
    });
  });

  describe('login', () => {
    test('should set tokens in localStorage on successful login', async () => {
      axios.post.mockResolvedValueOnce({
        data: {
          token: 'mock-jwt-token',
          refresh_token: 'mock-refresh-token'
        }
      });

      const response = await AuthService.login('pelajar@sejiwa.com', 'password123');

      expect(localStorage.getItem('token')).toBe('mock-jwt-token');
      expect(localStorage.getItem('refresh_token')).toBe('mock-refresh-token');
      expect(response.token).toBe('mock-jwt-token');
    });

    test('should throw error when login fails', async () => {
      axios.post.mockRejectedValueOnce({
        response: {
          data: {
            message: 'Wrong password'
          }
        }
      });

      await expect(AuthService.login('pelajar@sejiwa.com', 'wrongpassword')).rejects.toThrow('Wrong password');
    });
  });

  describe('logout', () => {
    let originalLocation;

    beforeAll(() => {
      originalLocation = window.location;
      delete window.location;
      window.location = { href: '' };
    });

    afterAll(() => {
      window.location = originalLocation;
    });

    test('should remove localStorage items and redirect to /login', () => {
      localStorage.setItem('token', 'some-token');
      localStorage.setItem('role', 'pelajar');
      localStorage.setItem('username', 'budi');

      AuthService.logout();

      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('role')).toBeNull();
      expect(localStorage.getItem('username')).toBeNull();
      expect(window.location.href).toBe('/login');
    });
  });

  describe('getAuthHeaders', () => {
    test('should return Authorization header with active token', async () => {
      const activePayload = { exp: Math.floor(Date.now() / 1000) + 3600 };
      const token = `header.${btoa(JSON.stringify(activePayload))}.signature`;
      localStorage.setItem('token', token);

      const headers = await AuthService.getAuthHeaders();
      expect(headers).toEqual({ Authorization: `Bearer ${token}` });
    });

    test('should refresh token if expired and return new header', async () => {
      const expiredPayload = { exp: Math.floor(Date.now() / 1000) - 3600 };
      const expiredToken = `header.${btoa(JSON.stringify(expiredPayload))}.signature`;
      localStorage.setItem('token', expiredToken);
      localStorage.setItem('refresh_token', 'refresh-token');

      axios.post.mockResolvedValueOnce({
        data: {
          token: 'new-jwt-token'
        }
      });

      const headers = await AuthService.getAuthHeaders();
      expect(localStorage.getItem('token')).toBe('new-jwt-token');
      expect(headers).toEqual({ Authorization: `Bearer new-jwt-token` });
    });
  });
});
