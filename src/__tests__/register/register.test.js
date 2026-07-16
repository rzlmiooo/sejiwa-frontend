import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegistrationForm from '@/app/register/register';
import axios from 'axios';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

jest.mock('axios');

describe('RegistrationForm Component', () => {
  let mockPush;

  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

  const goToStep2 = () => {
    render(<RegistrationForm />);
    // Fill required step 1 fields
    fireEvent.change(screen.getByPlaceholderText('Masukkan email Anda'), { target: { value: 'test@sejiwa.com' } });
    fireEvent.change(screen.getByPlaceholderText('Buat password yang kuat'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText('Ketik ulang password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'pelajar' } });
    
    // Click Register button to go to step 2
    fireEvent.click(screen.getByRole('button', { name: /Register/i }));
  };

  test('should set imageError if no file is selected', async () => {
    goToStep2();

    const fileInput = screen.getByLabelText(/Tetapkan Foto Profil/i);
    // Simulate empty files array
    fireEvent.change(fileInput, { target: { files: [] } });

    expect(screen.getByText('Tambahkan foto profil.')).toBeInTheDocument();
  });

  test('should set imageLoading to true when uploading starts', async () => {
    // Keep axios mock from resolving immediately
    axios.post.mockImplementationOnce(() => new Promise(() => {}));
    goToStep2();

    const fileInput = screen.getByLabelText(/Tetapkan Foto Profil/i);
    const file = new File(['mock content'], 'avatar.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('Uploading image...')).toBeInTheDocument();
  });

  test('should set profile_picture url on successful upload', async () => {
    axios.post.mockResolvedValueOnce({
      data: { secure_url: 'https://cdn.sejiwa.com/avatar.png' }
    });
    goToStep2();

    const fileInput = screen.getByLabelText(/Tetapkan Foto Profil/i);
    const file = new File(['mock content'], 'avatar.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('Image uploaded successfully!')).toBeInTheDocument();
    });

    const previewImg = screen.getByAltText('Profile Preview');
    expect(previewImg).toBeInTheDocument();
    expect(previewImg.getAttribute('src')).toBe('https://cdn.sejiwa.com/avatar.png');
  });

  test('should set imageError on failed upload', async () => {
    axios.post.mockRejectedValueOnce({
      response: { data: { error: 'File size too large' } }
    });
    goToStep2();

    const fileInput = screen.getByLabelText(/Tetapkan Foto Profil/i);
    const file = new File(['mock content'], 'avatar.png', { type: 'image/png' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(screen.getByText('File size too large')).toBeInTheDocument();
    });
  });
});
