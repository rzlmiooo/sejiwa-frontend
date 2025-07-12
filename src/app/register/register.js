"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants";
import localFont from "next/font/local"

const rubik = localFont({
  src: [
    {
      path: '../fonts/Rubik/rubik-v30-latin-regular.woff2',
      style: 'normal',
    },
  ],
  display: 'swap'
})

export default function RegistrationForm() {
  const router = useRouter();
  
  const [step, setStep] = useState(1);

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    role: "",
    profile_picture: "",
    successMessage: null,
    errorMessage: null,
    imageLoading: false,
    imageError: null,
    selectedFile: null
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleFilePictureChange = async (e) => {
    setState((prevState) => ({
      ...prevState,
      imageError: null,
      profile_picture: "",
      selectedFile: null
    }));

    const file = e.target.files ? e.target.files[0] : null;

    if (!file) {
      setState((prevState) => ({ ...prevState, imageError: "Tambahkan foto profil." }));
      return;
    }

    setState((prevState) => ({ ...prevState, selectedFile: file, imageLoading: true }));
    
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(
        'https://sejiwa.onrender.com/api/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const resData = response.data;

      setState((prev) => ({ ...prev, profile_picture : resData.secure_url || resData.url }));
    } catch (err) {
      console.error("Full image upload error object:", err);
      console.error("Image upload error response data:", err?.response?.data);

      setState((prevState) => ({
        ...prevState,
        imageError: err?.response?.data?.error || "Gagal mengupload gambar. Coba lagi.",
        selectedFile: null, 
      }));
    } finally {
      setState((prevState) => ({ ...prevState, imageLoading: false }));
    }
  };

  const sendDetailsToServer = () => {
    if (state.email && state.password && state.username && state.role && state.profile_picture) {
      setState((prev) => ({ ...prev, errorMessage: null }));

      const payload = {
        email: state.email,
        password: state.password,
        username: state.username,
        role: state.role,
        profile_picture: state.profile_picture
      };

      axios.post("https://sejiwa.onrender.com/api/signup", payload)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            setState((prevState) => ({
              ...prevState,
              successMessage: "Registration successful. Redirecting to home...",
              errorMessage: null
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToLogin();
          } else {
            setState((prev) => ({
              ...prev,
              errorMessage: "Koneksi jaringan buruk."
            }));
          }
        })
        .catch((error) => {
          console.error(error);
          setState((prev) => ({
            ...prev,
            errorMessage: "Koneksi buruk: " + error.message
          }));
        });
    } else {
      setState((prev) => ({
        ...prev,
        errorMessage: "Harap mengisi semua form. Pastikan Anda sudah mengisi semua form dan memasang foto profil"
      }));
    }
  };

  const redirectToHome = () => {
    router.push("/home");
  };

  const redirectToLogin = () => {
    router.push("/login");
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    if (state.password === state.confirmPassword) {
      sendDetailsToServer();
    } else {
      setState((prev) => ({
        ...prev,
        errorMessage: "Ketik ulang password dengan benar."
      }));
    }
  };

  return (
    <div className={`flex justify-center items-center h-screen overflow-hidden ${rubik.className}`}>
      {/* scroll */}
      <div className="hidden sm:flex object-cover justify-center items-center w-full gap-5 bg-sky-50">
        <div className="mt-84 flex flex-col gap-5 animate-scroll-up">
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
        </div>
        <div className="hidden lg:flex flex-col gap-5 animate-scroll-up">
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
          <div className="p-5 py-5 w-50 md:w-60 h-80 md:h-80 rounded-2xl bg-gray-200" />
        </div>
      </div>
      <div className="p-5 bg-sky-500 h-full w-full">
        <form onSubmit={handleSubmitClick} className="flex flex-col justify-center items-start m-auto h-full w-full p-10 bg-sky-700 rounded-2xl">
          <div className="flex items-center justify-start gap-5 m-5">
            <img src="/icon.png" alt="logo" className="h-10 w-auto" />
            <h1 className="text-l text-sky-50">Register</h1>
          </div>

          {step === 1 && (
            <>
            <div className="mx-5 my-3">
              <label htmlFor="email" className="text-sm/6 font-medium text-sky-50">Email address</label>
              <input
                type="email"
                className="mt-3 block w-full rounded-lg border-none focus:outline-none bg-white/5 px-3 py-1.5 text-sm/6 text-sky-50"
                id="email"
                placeholder="Masukkan email Anda"
                value={state.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mx-5 my-3">
              <label htmlFor="password" className="text-sm/6 font-medium text-sky-50">Password</label>
              <input
                type="password"
                className="mt-3 block w-full rounded-lg border-none focus:outline-none bg-white/5 px-3 py-1.5 text-sm/6 text-sky-50"
                id="password"
                placeholder="Buat password yang kuat"
                value={state.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mx-5 my-3">
              <label htmlFor="confirmPassword" className="text-sm/6 font-medium text-sky-50">Konfirmasi Password</label>
              <input
                type="password"
                className="mt-2 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-sky-50"
                id="confirmPassword"
                placeholder="Ketik ulang password"
                value={state.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mx-5 my-3">
              <label htmlFor="role" className="text-sm/6 font-medium text-sky-50">Anda disini sebagai: </label>
              <select
                id="role"
                className="ml-2 p-1 border-none focus:outline-none text-sm/6 text-gray-900 bg-white font-medium border-2 border-sky-600 rounded-xl"
                value={state.role}
                onChange={handleChange}
              >
                <option value="" className="bg-sky-500">Pilih Role</option>
                <option value="pelajar" className="text-gray-900 font-bold">Pelajar</option>
                <option value="konselor" className="text-gray-900 font-bold">Konselor</option>
              </select>
            </div>
            <button type="button" className="mx-4 rounded-lg bg-sky-600 px-16 py-2 text-base text-sky-50 active:bg-sky-700 hover:bg-sky-500 cursor-pointer transition-colors duration-200 ease-in-out" onClick={() => setStep(2)}>Register</button>
            </>
          )}
          
          {step === 2 && (
          <>
          <div className="mx-5 my-3 w-full">
            <label className="block mb-2 text-sky-50" htmlFor="profile_picture">Tetapkan Foto Profil</label>
            <input
              className="w-full p-2 text-sky-50  outline-none focus:bg-white/10 rounded-md file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={handleFilePictureChange}
              disabled={state.imageLoading}
            />
            {state.imageLoading && <p className="text-blue-300 text-sm mt-2">Uploading image...</p>}
            {state.imageError && <p className="text-red-300 text-sm mt-2">{state.imageError}</p>}
            {state.profile_picture && (
              <div className="text-green-300 mb-4 text-sm mt-2">
                <p>Image uploaded successfully!</p>
                <img src={state.profile_picture} alt="Profile Preview" className="mt-2 size-40 object-cover rounded-full border-2 border-white" />
              </div>
            )}
            {state.selectedFile && !state.imageLoading && !state.profile_picture && !state.imageError && (
              <p className="text-gray-300 text-sm mt-2">Ready to upload: {state.selectedFile.name}</p>
            )}
          </div>

          {state.errorMessage && <p className="text-red-300 mb-4 mx-5 text-sm text-center w-full">{state.errorMessage}</p>}
          {state.successMessage && <p className="text-green-300 mb-4 mx-5 text-sm text-center w-full">{state.successMessage}</p>}

          <div className="mx-5 my-3">
            <label htmlFor="username" className="text-sm/6 font-medium text-sky-50">Username</label>
            <input
              type="text"
              className="mt-3 block w-full rounded-lg border-none focus:outline-none bg-white/5 px-3 py-1.5 text-sm/6 text-sky-50"
              id="username"
              placeholder="Buat username Anda"
              value={state.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex px-6 w-full text-center gap-4 mt-4">
            <button type="button" className="hover:font-bold text-sky-50" onClick={() => setStep(1)}>Back</button>
            <input
              type="submit"
              className="rounded-lg bg-sky-600 px-10 py-2 text-base text-sky-50 active:bg-sky-700 hover:bg-sky-500 cursor-pointer transition-colors duration-200 ease-in-out"
              value={state.imageLoading ? "Uploading Image..." : "Register"}
              disabled={state.imageLoading}
            />
          </div>
          </>
          )}

          <div className="mx-5 my-4">
            <span className="text-sky-50">Sudah punya akun? </span>
            <span className="text-sky-400 underline cursor-pointer"
              onClick={redirectToLogin}>
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}