import { useEffect, useState } from "react";
import { getAllProducts } from "../API";
import {List, Card, Image,Typography, Badge, Rate, Button} from 'antd';
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
        grid={{column:4}}
        renderItem={(product,index)=>{
            return  <Badge.Ribbon text={product.discountPercentage} color="pink" className="itemCardBadge">
            <Card className="itemCard" title={product.title} key={index} 
            cover={<Image className="itemCardImage" src ={product.thumbnail}/>}
            actions={[
                <Rate value={product.rating} allowHalf/>,
                <AddToCartButton/>
            ]}
            >
                <Card.Meta title={<Typography.Paragraph>
                    Price: ${product.price}{" "}
                    <Typography.Text delete type="danger">
                        ${parseFloat(product.price + (product.price*product.discountPercentage)/100).toFixed(2)}                       
                    </Typography.Text>
                </Typography.Paragraph>}
                    description={<Typography.Paragraph ellipsis={{rows:2,expandable:true,symbol:"more"}}>{product.description}</Typography.Paragraph>}
                >
                    
                </Card.Meta>
            </Card>
            </Badge.Ribbon>
        }} dataSource={items}>

        </List>
    </div>
}

function AddToCartButton(){
    const addProductToCart = ()=>{
        
    }
    return <Button type="link"  onClick={()=>{
        addProductToCart();
    }}>Add to cart</Button>
}

export default Products;