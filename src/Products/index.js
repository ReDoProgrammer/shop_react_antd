import { useEffect, useState } from "react";
import { getAllProducts } from "../API";
import {List, Card, Image} from 'antd';
//các kiến thức liên quan tới hook: useState,useEffect
function Products() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        getAllProducts().then(res => {          
            setItems(res.products);
        })
    }, [])// dung mảng trống [] chỉ gọi 1 lần
    return <div>
        <List renderItem={(product,index)=>{
            return <Card title={product.title} key={index} cover={<Image src ={product.thumbnail}/>}>

            </Card>
        }} dataSource={items}>

        </List>
    </div>
}

export default Products;