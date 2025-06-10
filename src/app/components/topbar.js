import React from 'react';

export default function Topbar(){
  return (
    <div className="w-full h-14 bg-blue-500 text-white flex justify-end items-center px-6 shadow">
      <div className="flex items-center space-x-4">
        {/* {data.map(item => (  */}
        <span className="text-sm font-semibold text-black">Hi, Rizal </span>
        {/* ))}  */}
        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
          {/* Avatar bisa diganti dengan gambar user */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-black"
          >
            <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
          </svg>
        </div>
      </div>
    </div>
  );
};
