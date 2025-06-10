"use client";

import { jwtDecode } from 'jwt-decode';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Josefin_Slab } from "next/font/google";
import { AuthService } from "../service/AuthService";

const josefinSlab = Josefin_Slab({
  variable: "--font-josefin-slab",
  subsets: ["latin"],
});

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const token = await AuthService.login(email, password);
      console.log("Login Successful:", token);

      const decoded = jwtDecode(token);
      const role = decoded.role;
      // const studentId = decoded?.id;

      if (!role) throw new Error("Masalah jaringan. Harap login ulang.");

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        router.push("/admin");
      } else if (role === "konselor") {
        router.push("/konselor/");
      } else {
        router.push("/home");
      }

    } catch (err) {
      console.error("Login error:", err?.response?.data || err.message);
      setError(err?.response?.data?.message || "Email atau password salah.");
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

      {/* form */}
      <div className="p-5 bg-sky-500 h-full w-full">

        {error && <p style={{ color: "red" }}>{error}</p>}
        <div className="flex flex-col justify-center items-start m-auto h-full w-full p-10 bg-sky-700 rounded-2xl">
          <div className="flex items-center justify-start gap-5 m-5">
            <img src="/icon.png" alt="logo" className="h-10 w-auto" />
            <h1 className="text-l text-white">Login</h1>
          </div>
          <h1 className={`${josefinSlab.className} m-5 text-2xl font-bold`}>
            Mindfulness, Refleksi diri, dan Keseimbangan Emosional
          </h1>
          <form onSubmit={handleSubmitClick}>
            <div className="mx-5 my-4">
              <label htmlFor="email" className="text-sm/6 font-medium text-white">Email address</label>
              <input
                type="email"
                className="mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mx-5 my-4">
              <label htmlFor="password" className="text-sm/6 font-medium text-white">Password</label>
              <input
                type="password"
                className="mt-3 block w-full rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="mx-5 rounded bg-sky-600 px-28 py-2 text-sm text-white active:bg-sky-700 hover:bg-sky-500 cursor-pointer">
              <div className="text-sm/6 font-bold">Login</div>
            </button>
          </form>

          <div className="p-5 font-bold">
            <span>Belum punya akun? </span>
            <span
              className="text-sky-500 underline cursor-pointer"
              onClick={() => router.push("/register")}
            >
              Register
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
