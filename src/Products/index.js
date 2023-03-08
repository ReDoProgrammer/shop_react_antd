import { useEffect, useState } from "react";
import { getAllProducts, addToCart,getProductsByCategory } from "../API";
import { List, Card, Image, Typography, Badge, Rate, Button, message } from 'antd';
import { useParams } from "react-router-dom";
//các kiến thức liên quan tới hook: useState,useEffect
function Products() {
    const param = useParams();
    const [items, setItems] = useState([]);
    useEffect(() => {
        getProductsByCategory(param.categoryId).then(res => {
            setItems(res.products);
        })
    }, [param])// nội dung được load lại khi param thay đổi
    return <div>
        <List
            grid={{ column: 4 }}

            renderItem={(product, index) => {
                return <Badge.Ribbon text={product.discountPercentage} color="pink" className="itemCardBadge">
                    <Card className="itemCard" title={product.title} key={index}
                        cover={<Image className="itemCardImage" src={product.thumbnail} />}
                        actions={[
                            <Rate value={product.rating} allowHalf />,
                            <AddToCartButton item={product} />
                        ]}
                    >
                        <Card.Meta title={<Typography.Paragraph>
                            Price: ${product.price}{" "}
                            <Typography.Text delete type="danger">
                                ${parseFloat(product.price + (product.price * product.discountPercentage) / 100).toFixed(2)}
                            </Typography.Text>
                        </Typography.Paragraph>}
                            description={<Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: "more" }}>{product.description}</Typography.Paragraph>}
                        >

                        </Card.Meta>
                    </Card>
                </Badge.Ribbon>
            }} dataSource={items}>

        </List>
    </div>
}

function AddToCartButton({ item }) {
    const [loading, setloading] = useState(false);
    const addProductToCart = () => {
        setloading(true);
        addToCart(item.id).then(res => {
            message.success(`${item.title} has been added to cart`);
            setloading(false);
        })
    }
    return <Button type="link" onClick={() => {
        addProductToCart();
    }}
    loading = {loading}
    >Add to cart</Button>
}

export default Products;