import React, { useEffect, useState } from "react";
import { CiBrightnessUp } from "react-icons/ci";
import { GiHamburgerMenu } from "react-icons/gi";
import { CiDark } from "react-icons/ci";

export default function Navbar({ isOpen, setIsOpen }) {
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div className="py-3 mx-auto flex items-center justify-between">
      <div className="md:hidden flex justify-between items-center gap-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className=" bg-primary block rounded-2xl p-2 text-white cursor-pointer"
        >
          <GiHamburgerMenu />
        </button>
        <button
          onClick={() => setIsDark(!isDark)}
          className=" bg-primary rounded-2xl p-2 my-2 text-white cursor-pointer"
        >
          {isDark ? <CiBrightnessUp /> : <CiDark />}
        </button>
      </div>

      <div className="flex flex-col justify-center items-center gap-1">
        <img
          src="img/admin.jpg"
          alt="admin profile"
          className="w-15 h-15 rounded-full"
        />
        <h2>ادمین کل</h2>
      </div>
      <div className="hidden md:block">
        <div className="flex justify-center items-center gap-3">
          <div className="bg-white inline-block p-2 rounded-2xl shadow-box dark:bg-[#161616]">
            <input
              className="outline-none text-black dark:text-white"
              type="text"
              placeholder="جست و جو کنید..."
            />
            <button className="bg-primary text-white px-5 pb-2 py-1 rounded-xl ">
              جست و جو
            </button>
          </div>
          <button
            onClick={() => setIsDark(!isDark)}
            className="bg-primary rounded-2xl p-2 my-2 text-white mx-1 cursor-pointer"
          >
            {isDark ? <CiBrightnessUp /> : <CiDark />}
          </button>
        </div>
      </div>
    </div>
  );
}
