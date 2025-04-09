import "./App.css";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Products from "./Pages/Products";
import Comments from "./Pages/Comments";
import Offs from "./Pages/Offs";
import Orders from "./Pages/Orders";
import Users from "./Pages/Users";
import Home from "./Pages/Home";
import { ToastContainer } from "react-toastify";
import { useState } from "react";

function App() {
 const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex justify-between">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen}/>

      <div className={`flex-4 p-5 md:pr-[210px]`}>
        <Navbar isOpen={isOpen} setIsOpen={setIsOpen}/>
        <ToastContainer autoClose={2000} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/users" element={<Users />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/offs" element={<Offs />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
