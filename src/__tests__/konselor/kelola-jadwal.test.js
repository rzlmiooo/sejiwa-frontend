import { render, screen, waitFor } from '@testing-library/react';
import KelolaJadwal from '@/app/konselor/kelola-jadwal/page';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { getStudentId } from '@/app/utils/auth/auth';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock auth utils
jest.mock('@/app/utils/auth/auth', () => ({
  getStudentId: jest.fn()
}));

// Mock axios
jest.mock('axios');

describe('KelolaJadwal Component', () => {
  let mockPush;
  const mockSchedules = [
    { id: 1, counselor_id: '5', date: '2026-07-15T00:00:00.000Z', time: '10:00 - 11:00', is_available: 'true' },
    { id: 2, counselor_id: '8', date: '2026-07-16T00:00:00.000Z', time: '14:00 - 15:00', is_available: 'true' }
  ];

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    getStudentId.mockReturnValue('5'); // Logged in as counselor ID 5
    localStorage.setItem('token', 'mock-token');
    jest.clearAllMocks();
  });

  test('renders page title and button triggers redirect to create schedule', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    render(<KelolaJadwal />);

    expect(screen.getByText('Kelola Jadwal')).toBeInTheDocument();
    
    const createBtn = screen.getByRole('button', { name: /Buat Jadwal/i });
    createBtn.click();
    expect(mockPush).toHaveBeenCalledWith('/konselor/kelola-jadwal/create-jadwal');
  });

  test('fetches schedules and filters them by current counselor_id', async () => {
    axios.get.mockResolvedValueOnce({ data: mockSchedules });
    render(<KelolaJadwal />);

    await waitFor(() => {
      // It should display schedule for counselor 5
      expect(screen.getByText('10:00 - 11:00')).toBeInTheDocument();
      // It should not display schedule for counselor 8
      expect(screen.queryByText('14:00 - 15:00')).not.toBeInTheDocument();
    });
  });
});
