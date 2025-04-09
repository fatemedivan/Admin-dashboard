import React, { useEffect, useState } from 'react'
import ProductsTable from '../Components/ProductsTable'
import Users from './Users';
import Orders from './Orders';
import Comments from './Comments';
import Offs from './Offs';

export default function Home() {
     const [products, setProducts] = useState([]);
      useEffect(() => {
        getAllproducts();
      }, []);
    
      const getAllproducts = () => {
        fetch("http://localhost:8000/api/products")
          .then(res => res.json())
          .then(data => setProducts(data))
    
      };
  return (
    <div>
      <ProductsTable getAllproducts={getAllproducts} products={products}/>
       <Users/>
       <Comments/>
       <Orders/>
       <Offs/>
    </div>
  )
}
