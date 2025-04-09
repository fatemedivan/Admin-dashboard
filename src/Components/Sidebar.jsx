import React, { useState } from "react";
import { IoHomeOutline } from "react-icons/io5";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FaRegComments } from "react-icons/fa";
import { MdOutlineLocalOffer } from "react-icons/md";
import { NavLink } from "react-router-dom";

import { IoMdClose } from "react-icons/io";
export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <div>
      <div
        className={`h-full right-0 top-0 fixed bg-primary text-white w-[180px] md:translate-x-0 md:fixed ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-2 border-b-1 border-white-50">
          <h1>به داشبورد خوش امدید</h1>
         
            <IoMdClose
              className="cursor-pointer md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            />
      
        </div>
        <ul className="pt-6">
          <NavLink to={"/"}>
            <li className="flex gap-2 items-center text-xl p-3 hover:bg-[#30146c] w-full">
              <IoHomeOutline />
              صفحه اصلی
            </li>
          </NavLink>
          <NavLink to={"/products"}>
            <li className="flex gap-2 items-center text-xl p-3 hover:bg-[#30146c] w-full">
              <MdProductionQuantityLimits />
              محصولات
            </li>
          </NavLink>
          <NavLink to={"/users"}>
            <li className="flex gap-2 items-center text-xl p-3 hover:bg-[#30146c] w-full">
              <FiUsers />
              کاربران
            </li>
          </NavLink>
          <NavLink to={"/comments"}>
            <li className="flex gap-2 items-center text-xl p-3 hover:bg-[#30146c] w-full">
              <FaRegComments />
              کامنت ها
            </li>
          </NavLink>
          <NavLink to={"/orders"}>
            <li className="flex gap-2 items-center text-xl p-3 hover:bg-[#30146c] w-full">
              <MdProductionQuantityLimits />
              سفارشات
            </li>
          </NavLink>
          <NavLink to={"/offs"}>
            <li className="flex gap-2 items-center text-xl p-3 hover:bg-[#30146c] w-full">
              <MdOutlineLocalOffer />
              تخفیف ها
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  );
}
