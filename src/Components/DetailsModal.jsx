import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function DetailsModal({onClose , children}) {
  
  return ReactDOM.createPortal(
    <div className="w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.5)] z-20 fixed top-0 opacity-0 modalActive transition-all duration-300 ease-in-out">
      <div className="bg-white p-6 dark:bg-[#161616]">
        {children}
        <div className="flex justify-end">

        <button onClick={()=> onClose()} className="bg-primary rounded-xl px-3 py-2 text-white mx-3 mt-8 cursor-pointer">بستن</button>
        </div>
      </div>
    </div>,
    document.getElementById("modals-parent")
  );
}
