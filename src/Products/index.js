import { useEffect, useState } from "react";
import { getAllProducts, addToCart,getProductsByCategory } from "../API";
import { List, Card, Image, Typography, Badge, Rate, Button, message, Spin, Select } from 'antd';
import { useParams } from "react-router-dom";
//các kiến thức liên quan tới hook: useState,useEffect
function Products() {
    const [loading, setloading] = useState(false);
    const param = useParams();
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('az');
    useEffect(() => {
        setloading(true);
        (param?.categoryId?getProductsByCategory(param.categoryId)
        :getAllProducts()
        )
        .then(res => {
            setItems(res.products);
            setloading(false);
        })
    }, [param])// nội dung được load lại khi param thay đổi

    const getSortedItems = ()=>{
        const sortedItems = [...items];
        sortedItems.sort((a,b)=>{
            const aLowerCase = a.title.toLowerCase();
            const bLowerCase = b.title.toLowerCase();
            if(sortOrder==='az'){
                return aLowerCase>bLowerCase?1:aLowerCase === bLowerCase?0:-1;
            }
            else if(sortOrder==='az'){
                return aLowerCase<bLowerCase?1:aLowerCase ===bLowerCase?0:-1;
            }
            else if(sortOrder==='lowHigh'){
                return a.price>b.price?1:a.price === b.price?0:-1;
            }
            else {
                return a.title<b.title?1:a.price === b.price?0:-1;
            }
        })
        return sortedItems;
    }

    if(loading){
        return <Spin spinning/>
    }

    return <div className="productsContainer">
        <div>
            <Typography.Text>View items sorted by:</Typography.Text>
            <Select 
            onChange={value=>{
                setSortOrder(value);
            }}
            defaultValue={"az"}
            options={[
                {
                    label:'Alphabetically a-z',
                    value:'az'
                },
                {
                    label:'Alphabetically z-a',
                    value:'za'
                },
                {
                    label:'Price Low to High',
                    value:'lowHigh'
                },
                {
                    label:'Price High to Low',
                    value:'highLow'
                }
            ]}></Select>
        </div>
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
            }} dataSource={getSortedItems(items)}>

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