import { Badge, Drawer, InputNumber, Menu, Table, Typography, Button } from 'antd';
import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getCart } from '../../API';

function Header() {
    const navigate = useNavigate();
    const onMenuClick = item => {
        navigate(`/${item.key}`)
    }
    return (<div className="header">
        <Menu
            onClick={onMenuClick}
            mode='horizontal'
            items={[
                {
                    label: <HomeFilled />,
                    key: ''
                },
                {
                    label: 'Men',
                    key: 'men',
                    children: [
                        {
                            label: "Men's Shirts",
                            key: 'mens-shirts'
                        },
                        {
                            label: "Men's Shoes",
                            key: "mens-shoes"
                        },
                        {
                            label: "Men's Watches",
                            key: "mens-watches"
                        }
                    ]
                },
                {
                    label: 'Women',
                    key: 'women',
                    children: [
                        {
                            label: "Women's Dresses",
                            key: "womens-dresses"
                        },
                        {
                            label: "Women's Shoes",
                            key: "womens-shoes"
                        },
                        {
                            label: "Women's Watches",
                            key: "womens-watches"
                        },
                        {
                            label: "Women's Bags",
                            key: "womens-bags"
                        },
                        {
                            label: "Women's Jewellery",
                            key: "womens-jewellery"
                        }
                    ]
                },
                {
                    label: 'Fragrances',
                    key: 'fragrances'
                }
            ]}
        />
        <Typography.Title>ReDo Store</Typography.Title>
        <AppCart />
    </div>);
}

function AppCart() {
    const [cartItems, setCartItems] = useState([])
    const [checkoutDrawerOpen, setcheckoutDrawerOpen] = useState(false)
    useEffect(() => {
        getCart()
            .then(res => {
                setCartItems(res.products);
            })
    }, [])
    const [carDrawOpen, setcarDrawOpen] = useState(false)
    return <div>
        <Badge onClick={() => {
            setcarDrawOpen(true);
        }} count={5} className='shoppingCartIcon' >
            <ShoppingCartOutlined />
        </Badge>
        <Drawer open={carDrawOpen} onClose={() => {
            setcarDrawOpen(false);
        }}
            title="Your cart"
            contentWrapperStyle={{ width: 500 }}
        >
            <Table
                pagination={false}
                columns={[
                    {
                        title: "Product",
                        dataIndex: "title"
                    },
                    {
                        title: "Price",
                        dataIndex: "price",
                        render: value => {
                            return <span>${value}</span>
                        }
                    },
                    {
                        title: "Q.ty",
                        dataIndex: "quantity",

                        render: (value, record) => {
                            return <InputNumber min={0} defaultValue={value}
                               onChange={value=>{
                                setCartItems(pre=>
                                    pre.map(cart=>{
                                        if(record.id === cart.id){
                                            cart.total = cart.price * value;
                                        }
                                        console.log(cart);
                                        return cart;
                                    })
                                )
                               }}
                            ></InputNumber>
                        }
                    },
                    {
                        title: "Total",
                        dataIndex: "total",
                        render: value => {
                            return <span>${value}</span>
                        }
                    }
                ]}
                dataSource={cartItems}
                summary={data => {
                    const total = data.reduce((pre, current) => {
                        return pre + current.total;
                    }, 0);
                    return <span>Total: ${total}</span>
                }}
            ></Table>
            <Button type='primary' onClick={_=>{
                setcheckoutDrawerOpen(true);
            }}>Checkout your cart</Button>
        </Drawer >
        <Drawer open={checkoutDrawerOpen} onClose={_=>{
            setcheckoutDrawerOpen(false);
        }}>

        </Drawer>
    </div >
}

export default Header;