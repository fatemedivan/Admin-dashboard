import React from "react";
import ReactDOM from "react-dom";

export default function EditModal({ onSubmit, children }) {
  return ReactDOM.createPortal(
    <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-20 fixed top-0 opacity-0 modalActive transition-all duration-300 ease-in-out">
      <div className="bg-white p-10 dark:bg-[#161616]">
        <h1 className="text-xl text-center mb-5">اطلاعات جدید را وارد کنید</h1>
        {children}
        <div className="flex justify-end">
          <button
            onClick={() => onSubmit()}
            className="bg-primary rounded-xl px-3 py-2 text-white mx-3 mt-8 cursor-pointer"
          >
            ثبت اطلاعات جدید
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
