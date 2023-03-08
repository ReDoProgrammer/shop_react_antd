import { Badge, Menu, Typography } from 'antd';
import { HomeFilled, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

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
    return <Badge count={5} className='shoppingCartIcon' >
        <ShoppingCartOutlined />
    </Badge>
}

export default Header;