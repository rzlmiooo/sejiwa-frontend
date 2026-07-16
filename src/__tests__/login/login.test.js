import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '@/app/login/login';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/app/service/AuthService';
import { jwtDecode } from 'jwt-decode';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('@/app/service/AuthService', () => ({
  AuthService: {
    login: jest.fn()
  }
}));

jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn()
}));

describe('Login Component Redirects', () => {
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    localStorage.clear();
    jest.clearAllMocks();
  });

  const performLogin = async (email, password) => {
    render(<Login />);
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: email } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: password } });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));
  };

  test('should redirect to /admin when user has admin role', async () => {
    AuthService.login.mockResolvedValueOnce({ token: 'mock-admin-token' });
    localStorage.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-admin-token';
      return null;
    });
    jwtDecode.mockReturnValueOnce({ role: 'admin', id: '1', username: 'admin_user' });

    await performLogin('admin@sejiwa.com', 'admin123');

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/admin');
    });
  });

  test('should redirect to /konselor/ when user has konselor role', async () => {
    AuthService.login.mockResolvedValueOnce({ token: 'mock-konselor-token' });
    localStorage.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-konselor-token';
      return null;
    });
    jwtDecode.mockReturnValueOnce({ role: 'konselor', id: '5', username: 'counselor_user' });

    await performLogin('counselor@sejiwa.com', 'counselor123');

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/konselor/');
    });
  });

  test('should redirect to /home when user has other roles (e.g. pelajar)', async () => {
    AuthService.login.mockResolvedValueOnce({ token: 'mock-pelajar-token' });
    localStorage.getItem.mockImplementation((key) => {
      if (key === 'token') return 'mock-pelajar-token';
      return null;
    });
    jwtDecode.mockReturnValueOnce({ role: 'pelajar', id: '10', username: 'student_user' });

    await performLogin('student@sejiwa.com', 'student123');

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/home');
    });
  });
});
