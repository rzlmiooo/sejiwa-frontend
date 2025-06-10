"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ACCESS_TOKEN_NAME } from "../constants/apiConstants";

export default function RegistrationForm() {
  const router = useRouter();

  const [state, setState] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
    role: "",
    successMessage: null,
    errorMessage: null
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const sendDetailsToServer = () => {
    if (state.email && state.password && state.username && state.role) {
      setState((prev) => ({ ...prev, errorMessage: null }));

      const payload = {
        email: state.email,
        password: state.password,
        username: state.username,
        role: state.role
      };

      axios.post("https://sejiwa.onrender.com/api/signup", payload)
        .then((response) => {
          if (response.status === 200) {
            setState((prevState) => ({
              ...prevState,
              successMessage: "Registration successful. Redirecting to home...",
              errorMessage: null
            }));
            localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
            redirectToHome();
          } else {
            setState((prev) => ({
              ...prev,
              errorMessage: "Unexpected server response."
            }));
          }
        })
        .catch((error) => {
          console.error(error);
          setState((prev) => ({
            ...prev,
            errorMessage: "Server error: " + error.message
          }));
        });
    } else {
      setState((prev) => ({
        ...prev,
        errorMessage: "Please fill in all fields."
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
        errorMessage: "Passwords do not match"
      }));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
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
        <form className="flex flex-col justify-center items-start m-auto h-full w-full p-10 bg-sky-700 rounded-2xl">
          <div className="flex items-center justify-start gap-5 m-5">
            <img src="/icon.png" alt="logo" className="h-10 w-auto" />
            <h1 className="text-l text-white">Register</h1>
          </div>
          <div className="mx-5 my-3">
            <label htmlFor="username" className="text-sm/6 font-medium text-white">User Name</label>
            <input
              type="text"
              className="mt-2 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white"
              id="username"
              placeholder="Add User Name"
              value={state.username}
              onChange={handleChange}
            />
          </div>
          <div className="mx-5 my-3">
            <label htmlFor="email" className="text-sm/6 font-medium text-white">Email address</label>
            <input
              type="email"
              className="mt-2 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white"
              id="email"
              placeholder="Enter email"
              value={state.email}
              onChange={handleChange}
            />
          </div>
          <div className="mx-5 my-3">
            <label htmlFor="password" className="text-sm/6 font-medium text-white">Password</label>
            <input
              type="password"
              className="mt-2 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white"
              id="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
            />
          </div>
          <div className="mx-5 my-3">
            <label htmlFor="confirmPassword" className="text-sm/6 font-medium text-white">Confirm Password</label>
            <input
              type="password"
              className="mt-2 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={state.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <div className="mx-5 my-3">
            <label htmlFor="role" className="text-sm/6 font-medium">Choose a Role</label>
            <select
              id="role"
              className="ml-2 p-1 text-sm/6 text-gray-900 bg-white font-medium border-2 border-sky-600 rounded-xl"
              value={state.role}
              onChange={handleChange}
            >
              <option value="" className="bg-sky-500">Select Role</option>
              <option value="pelajar" className="text-gray-900 font-bold">Pelajar</option>
              <option value="konselor" className="text-gray-900 font-bold">Konselor</option>
              {/* <option value="admin" className="text-gray-900 font-bold">Admin</option> */}
            </select>
          </div>

          <button
            type="submit"
            className="mx-5 rounded-lg bg-sky-600 px-19 py-2 text-sm text-white active:bg-sky-700 hover:bg-sky-500 cursor-pointer"
            onClick={handleSubmitClick}
          >
            Register
          </button>

          {state.successMessage && (
            <div className="alert alert-success mt-2" role="alert">
              {state.successMessage}
            </div>
          )}

          {state.errorMessage && (
            <div className="alert alert-danger mt-2" role="alert">
              {state.errorMessage}
            </div>
          )}

          <div className="mx-5 my-4">
            <span>Sudah punya akun? </span>
            <span className="text-sky-400 underline cursor-pointer" onClick={redirectToLogin}>
              Login
            </span>
          </div>
        </form>

      </div>
    </div>
  );
}