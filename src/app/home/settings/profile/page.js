'use client';

import { useEffect, useState } from 'react';
import axios from 'axios'; 
import { getStudentId } from '@/app/utils/auth/auth';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
    role: '',
    profile_picture: '',
  });

  const [uiState, setUiState] = useState({
    successMessage: null,
    errorMessage: null,
    imageLoading: false,
    imageError: null,
  });

  const userId = getStudentId();
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { email, password, confirmPassword, username, role, profile_picture } = formData;
  const { successMessage, errorMessage, imageLoading, imageError } = uiState;

  useEffect(() => {
    const fetchUser = async () => {
      if (!token || !userId) {
        console.warn('No token or user ID found. User is not authenticated.');
        return;
      }

      try {
        const res = await axios.get('https://sejiwa.onrender.com/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const userData = res.data.find((u) => u.id === userId);

        if (userData) {
          setUser(userData);
          setFormData({
            username: userData.username,
            email: userData.email,
            password: '', 
            confirmPassword: '',
            role: userData.role,
            profile_picture: userData.profile_picture,
          });
        } else {
          setUiState((prev) => ({ ...prev, errorMessage: 'User data not found.' }));
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setUiState((prev) => ({
          ...prev,
          errorMessage: 'Failed to fetch user data. Please try again.',
        }));
      }
    };

    fetchUser();
  }, [token, userId]); 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
      setPreview(null);
    }
  };

  const handleProfilePictureUpload = async (e) => {
    setUiState((prev) => ({ 
      ...prev, 
      imageError: null, 
      imageLoading: true 
    }));
    
    setFormData((prev) => ({ 
      ...prev, 
      profile_picture: '' 
    })); 

    const file = e.target.files?.[0];

    if (!file) {
      setUiState((prev) => ({ ...prev, imageError: 'No file selected.', imageLoading: false }));
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file); 
    setPreview(URL.createObjectURL(file)); 

    try {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append('image', file); 

      const response = await axios.post('https://sejiwa.onrender.com/api/upload', cloudinaryFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const resData = response.data;
      setFormData((prev) => ({ ...prev, profile_picture: resData.url }));
      setUiState((prev) => ({ ...prev, successMessage: 'Image uploaded successfully!' }));
    } catch (err) {
      console.error('Image upload error:', err.response?.data || err.message);
      setUiState((prev) => ({
        ...prev,
        imageError: err.response?.data?.error || 'Failed to upload image. Please try again.',
      }));
      setSelectedFile(null);
      setPreview(user?.profile_picture || '/profile.png'); 
    } finally {
      setUiState((prev) => ({ ...prev, imageLoading: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      setUiState((prev) => ({ ...prev, errorMessage: 'Authentication token not found.' }));
      return;
    }

    if (password !== confirmPassword) {
      setUiState((prev) => ({ ...prev, errorMessage: 'Passwords do not match.' }));
      return;
    }

    const payload = {
      email: formData.email,
      username: formData.username,
      role: formData.role,
      password: formData.password,
      profile_picture: formData.profile_picture
      // ...(formData.password && { password: formData.password }), 
    };

    try {
      await axios.put(`https://sejiwa.onrender.com/api/users/${userId}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      setUiState((prev) => ({ ...prev, successMessage: 'Profile updated successfully!', errorMessage: null }));
     
    } catch (err) {
      console.error('Error updating profile:', err.response?.data || err.message);
      setUiState((prev) => ({
        ...prev,
        errorMessage: err.response?.data?.message || 'Failed to update profile. Please try again.',
        successMessage: null,
      }));
    }
  };

  const handleDelete = async () => {
    const confirmation = confirm('Yakin nih mau hapus akunmu? akunmu bakal dihapus selama lama lama lamanya');
    if (!confirmation) return;

    if (!token) {
      setUiState((prev) => ({ ...prev, errorMessage: 'Authentication token not found.' }));
      return;
    }

    try {
      await axios.delete(`https://sejiwa.onrender.com/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Akunmu sudah menghilang dari semesta😢');
      localStorage.removeItem('token');
      window.location.href = '/login'; 
    } catch (err) {
      console.error('Error deleting account:', err.response?.data || err.message);
      setUiState((prev) => ({
        ...prev,
        errorMessage: err.response?.data?.message || 'Failed to delete account. Please try again.',
      }));
    }
  };

  if (!user)
    return (
      <p className="text-center mt-10 text-black dark:text-white">Loading user profile...</p>
    );

  return (
    <div className="flex h-screen">
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto p-8">
          <div className="flex flex-col items-center gap-4">
            <img
              src={preview || user.profile_picture || '/profile.png'}
              alt="Profile Picture"
              className="w-64 h-64 rounded-full object-cover border-4 border-gray-300"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              className="text-sm"
            />
            {imageLoading && <p className="text-blue-500">Uploading image...</p>}
            {imageError && <p className="text-red-500">{imageError}</p>}
          </div>

          <div className="space-y-4">
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}

            <div>
              <label htmlFor="username" className="block text-sm font-semibold mb-1">
                Username
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current: {user.username}</p>
              <input
                type="text"
                id="username" 
                value={username}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-semibold mb-1">
                Email
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current: {user.email}</p>
              <input
                type="email"
                id="email"
                value={email}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold mb-1">
                New Password
              </label>
              <input
                type="password" 
                id="password"
                value={password}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-1">
                Confirm New Password
              </label>
              <input
                type="password" 
                id="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div hidden>
              <label htmlFor="role" className="block text-sm font-semibold mb-1">
                Role
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Current: {user.role}</p>
              <input
                type="text"
                id="role"
                value={role}
                onChange={handleInputChange}
                className="w-full border rounded px-3 py-2 text-black dark:text-white dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
                disabled={imageLoading} 
              >
                Save Changes
              </button>

              <button
                type="button"
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete Account
              </button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}