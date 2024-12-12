import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="flex flex-grow justify-center items-center px-4 py-6">
      <div className="relative flex flex-col gap-11 items-center min-w-full md:min-w-[450px]">
        <h1 className="font-bold text-3xl">Profile</h1>

        <form className="flex flex-col items-center gap-5 w-full">

            <input type="file" accept="image/*" className="hidden" />
        {/* image wrapper  */}
        <div className="relative h-36 w-36 rounded-full cursor-pointer overflow-hidden border-[2px] mb-5" >
          <img
            src={currentUser.validUser.profilePicture}
            alt="profile"
            className="object-cover h-full w-full"
          />
        </div>

          <input
            type="text"
            id="username"
            placeholder="Username"
            className="bg-gray-200 text-black px-4 py-2 rounded-lg w-full outline-none "
            defaultValue={currentUser.validUser.username}
            
          />
          <input
            type="email"
            id="email"
            placeholder="email"
            className="bg-gray-200 text-black px-4 py-2 rounded-lg w-full outline-none "
            defaultValue={currentUser.validUser.email}
            
          />
          <input
            type="password"
            id="password"
            placeholder="password"
            className="bg-gray-200 text-black px-4 py-2 rounded-lg w-full outline-none "
          />

          <button type='submit' className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-2 rounded-lg">Update</button>
        </form>

        <div className="w-full font-semibold flex justify-between text-red-500">
            <button>Delete Account</button>
            <button>Log Out</button>
        </div>
      </div>
    </div>
  );
}
