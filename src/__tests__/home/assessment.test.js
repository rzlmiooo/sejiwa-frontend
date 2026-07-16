import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Ass from '@/app/home/assessment/assessment';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

// Mock axios
jest.mock('axios');

describe('Assessment Component (Ass)', () => {
  let mockPush;
  const mockQuestions = [
    { id: 1, code: 'STRESS', label: 'Stres berlebihan', quote: 'Semangat terus!' },
    { id: 2, code: 'ANXIETY', label: 'Cemas cemas', quote: 'Tenang saja.' }
  ];

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    localStorage.setItem('token', 'mock-token');
    jest.clearAllMocks();
  });

  test('renders loading screen initially', () => {
    axios.get.mockImplementationOnce(() => new Promise(() => {})); // Never resolves to keep loading state active
    render(<Ass />);
    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
  });

  test('fetches and renders questions successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: mockQuestions });
    render(<Ass />);

    await waitFor(() => {
      expect(screen.queryByText('Loading questions...')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Stres berlebihan')).toBeInTheDocument();
    expect(screen.getByText('Cemas cemas')).toBeInTheDocument();
    expect(screen.getByText('Semangat terus!')).toBeInTheDocument();
  });

  test('submits selected answers with correct intensity and redirects', async () => {
    axios.get.mockResolvedValueOnce({ data: mockQuestions });
    axios.post.mockResolvedValueOnce({ status: 200 });

    render(<Ass />);

    await waitFor(() => {
      expect(screen.queryByText('Loading questions...')).not.toBeInTheDocument();
    });

    // Find checkboxes and options
    const checkboxes = screen.getAllByRole('checkbox');
    const selects = screen.getAllByRole('combobox');

    // Check first emotion (Stres) and set intensity to High
    fireEvent.click(checkboxes[0]);
    fireEvent.change(selects[0], { target: { value: 'high' } });

    // Submit the form
    const submitBtn = screen.getByRole('button', { name: /Kirim Assessment/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.anything(),
        {
          answers: [
            { code: 'STRESS', intensity: 'high' }
          ]
        }
      );
    });

    expect(mockPush).toHaveBeenCalledWith(
      expect.stringContaining('/home/recommendation?answers=')
    );
  });
});
