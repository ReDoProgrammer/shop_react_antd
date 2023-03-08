import { useEffect, useState } from "react";
import { getAllProducts } from "../API";
import {List, Card, Image,Typography} from 'antd';
//các kiến thức liên quan tới hook: useState,useEffect
function Products() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        getAllProducts().then(res => {          
            setItems(res.products);
        })
    }, [])// dung mảng trống [] chỉ gọi 1 lần
    return <div>
        <List 
        grid={{column:3}}
        renderItem={(product,index)=>{
            return <Card title={product.title} key={index} cover={<Image className="itemCardImage" src ={product.thumbnail}/>}>
                <Card.Meta title={<Typography.Paragraph>
                    Price: ${product.price}{" "}
                    <Typography.Text delete type="danger">
                        {parseFloat(product.price + (product.price*product.discountPercentage)/100).toFixed(2)}
                       
                    </Typography.Text>
                </Typography.Paragraph>}>

                </Card.Meta>
            </Card>
        }} dataSource={items}>

        </List>
    </div>
}

export default Products;