import { useEffect, useState } from "react";
import { getAllProducts } from "../API";
//các kiến thức liên quan tới hook: useState,useEffect
function Products() {
    const [Items, setItems] = useState([]);
    useEffect(() => {
        getAllProducts().then(res => {
            setItems(res.products);
        })
    }, [])// dung mảng trống [] chỉ gọi 1 lần
    return <div>Items</div>
}

export default Products;