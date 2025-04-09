import React from "react";
import ReactDOM from "react-dom";

export default function ActionModal({ title,onSubmit, onCancel }) {
  return ReactDOM.createPortal(
    <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-20 fixed top-0 opacity-0 modalActive transition-all duration-300 ease-in-out">
      <div className="bg-white p-10 dark:bg-[#161616]">
        <h2 className="text-center mb-4 text-2xl">
          {title}
        </h2>
        <div className="flex justify-center items-center">
          <button
            onClick={() => {
              onSubmit()

            }}
            className="bg-primary text-white px-4 py-1 rounded-lg cursor-pointer"
          >
            بله
            
          </button>
          <button
            onClick={() => onCancel()}
            className="bg-gray-300 dark:bg-[#333] px-4 py-1 mr-4 rounded-lg cursor-pointer"
          >
            خیر
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
