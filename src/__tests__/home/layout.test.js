import { render, screen, act } from '@testing-library/react';
import Homepage from '@/app/home/layout';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/app/service/AuthService';
import { toast } from 'react-hot-toast';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    error: jest.fn()
  }
}));

jest.mock('@/app/service/AuthService', () => ({
  AuthService: {
    logout: jest.fn()
  }
}));

jest.mock('../components/sidebar', () => {
  return function MockSidebar() {
    return <div data-testid="sidebar">Sidebar</div>;
  };
});

jest.mock('../components/navbar', () => {
  return function MockNavbar() {
    return <div data-testid="navbar">Navbar</div>;
  };
});

describe('Homepage Layout Component', () => {
  let mockReplace;

  beforeEach(() => {
    mockReplace = jest.fn();
    useRouter.mockReturnValue({ replace: mockReplace });
    localStorage.clear();
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('should redirect to /unauthorized if no token is found', () => {
    render(
      <Homepage>
        <div data-testid="child">Dashboard Content</div>
      </Homepage>
    );

    expect(mockReplace).toHaveBeenCalledWith('/unauthorized');
    expect(screen.getByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByTestId('child')).not.toBeInTheDocument();
  });

  test('should render children if token is valid and not expired', () => {
    const futurePayload = { exp: Math.floor(Date.now() / 1000) + 3600 }; // 1 hour in future
    const validToken = `header.${btoa(JSON.stringify(futurePayload))}.signature`;
    localStorage.setItem('token', validToken);

    render(
      <Homepage>
        <div data-testid="child">Dashboard Content</div>
      </Homepage>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });

  test('should trigger logout and toast error if token is expired', () => {
    const expiredPayload = { exp: Math.floor(Date.now() / 1000) - 3600 }; // 1 hour in past
    const expiredToken = `header.${btoa(JSON.stringify(expiredPayload))}.signature`;
    localStorage.setItem('token', expiredToken);

    render(
      <Homepage>
        <div data-testid="child">Dashboard Content</div>
      </Homepage>
    );

    expect(toast.error).toHaveBeenCalledWith('Sesi Anda telah berakhir. Silakan login ulang.');
    expect(AuthService.logout).toHaveBeenCalled();
  });

  test('should trigger logout if token format is invalid', () => {
    localStorage.setItem('token', 'invalid-token-format');

    render(
      <Homepage>
        <div data-testid="child">Dashboard Content</div>
      </Homepage>
    );

    expect(AuthService.logout).toHaveBeenCalled();
  });

  test('should set interval to check token validity periodicially', () => {
    const futurePayload = { exp: Math.floor(Date.now() / 1000) + 3600 };
    const validToken = `header.${btoa(JSON.stringify(futurePayload))}.signature`;
    localStorage.setItem('token', validToken);

    render(
      <Homepage>
        <div data-testid="child">Dashboard Content</div>
      </Homepage>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();

    // Now expire token on next check
    const expiredPayload = { exp: Math.floor(Date.now() / 1000) - 3600 };
    const expiredToken = `header.${btoa(JSON.stringify(expiredPayload))}.signature`;
    localStorage.setItem('token', expiredToken);

    // Fast-forward 5 seconds
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(AuthService.logout).toHaveBeenCalled();
  });
});
