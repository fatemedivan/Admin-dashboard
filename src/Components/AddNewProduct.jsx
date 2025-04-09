import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

export default function AddNewProduct({ getAllproducts }) {
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCount, setNewCount] = useState("");
  const [newImg, setNewImg] = useState("");
  const [newPopularity, setNewPopularity] = useState("");
  const [newSale, setNewSale] = useState("");
  const [newColors, setNewColors] = useState("");

  const createNewProduct = (e) => {
    e.preventDefault();
    let newProductInfos = {
      title: newTitle,
      price: newPrice,
      count: newCount,
      img: newImg,
      popularity: newPopularity,
      sale: newSale,
      colors: newColors,
    };
    fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProductInfos),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("response from server : ", data);
        getAllproducts();
        toast.success("با موفقیت اطلاعات ثبت شد", {
          className: "Toastify--toast",
        });
        emptyInputs();
      })
      .catch((err) => {
        console.log("error : ", err);
        toast.error("خطایی رخ داده است", {
          className: "Toastify--toast",
        });
        emptyInputs();
      });
  };
  const emptyInputs = () => {
    setNewTitle("");
    setNewSale("");
    setNewColors("");
    setNewCount("");
    setNewImg("");
    setNewPopularity("");
    setNewPrice("");
  };
  return (
    <div className="mt-10">
      <h1 className="text-3xl mb-3">افزودن محصول جدید</h1>
      <form className="bg-white rounded-lg p-5 flex flex-col dark:bg-[#161616]">
        <div className="w-full grid grid-cols-1 md:grid-cols-2  gap-3 text-black dark:text-white">
          <div className="w-full bg-white-50 p-3 rounded-xl dark:bg-[#222]">
            <input
              className="outline-none w-full "
              type="text"
              placeholder="اسم محصول را بنویسید"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="w-full bg-white-50 p-3 rounded-xl dark:bg-[#222]">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="قیمت محصول را بنویسید"
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
            />
          </div>
          <div className="w-full bg-white-50 p-3 rounded-xl dark:bg-[#222]">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="موجودی محصول را بنویسید"
              value={newCount}
              onChange={(e) => setNewCount(e.target.value)}
            />
          </div>
          <div className="w-full bg-white-50 p-3 rounded-xl dark:bg-[#222]">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="ادرس عکس محصول را بنویسید"
              value={newImg}
              onChange={(e) => setNewImg(e.target.value)}
            />
          </div>
          <div className="w-full bg-white-50 p-3 rounded-xl dark:bg-[#222]">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="میزان محبوبیت محصول را بنویسید"
              value={newPopularity}
              onChange={(e) => setNewPopularity(e.target.value)}
            />
          </div>
          <div className="w-full bg-white-50 p-3 rounded-xl dark:bg-[#222]">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="میزان فروش محصول را بنویسید"
              value={newSale}
              onChange={(e) => setNewSale(e.target.value)}
            />
          </div>
          <div className="w-full bg-white-50 p-3 rounded-xl dark:bg-[#222]">
            <input
              className="outline-none w-full"
              type="text"
              placeholder="تعداد رنگ بندی محصول را بنویسید"
              value={newColors}
              onChange={(e) => setNewColors(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end items-center">
          <button
            className="bg-primary rounded-xl p-3 text-white mt-3"
            onClick={createNewProduct}
          >
            ثبت محصول
          </button>
        </div>
      </form>
    </div>
  );
}
