import React, { useEffect, useState } from "react";
import AddNewProduct from "../Components/AddNewProduct";
import ProductsTable from "../Components/ProductsTable";
import { HashLoader } from "react-spinners";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAllproducts();
  }, []);


  const getAllproducts = () => {
    try {
      fetch("http://localhost:8000/api/products")
        .then((res) => {
          if (!res.ok) {
            throw new Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setProducts(data);
          setIsLoading(false);
        });
    } catch (error) {
      console.log("error", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-[60vh]">
          <HashLoader color="#471AAA" size={80} />
          <p className="mt-5 text-lg text-gray-600 animate-pulse dark:text-white">
            loading...
          </p>
        </div>
      ) : (
        <div>
          <AddNewProduct getAllproducts={getAllproducts} />
          <ProductsTable getAllproducts={getAllproducts} products={products}  />
        </div>
      )}
    </>
  );
}
