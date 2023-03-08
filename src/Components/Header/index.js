import { Menu } from 'antd';
import {HomeFilled} from '@ant-design/icons';
function Header() {
    return (<div className="header">
        <Menu
            mode='horizontal'
            items={[
                {
                    label: <HomeFilled/>,
                    key: 'home'
                },
                {
                    label: 'Men',
                    key: 'men'
                },
                {
                    label: 'Women',
                    key: 'women'
                },
                {
                    label: 'Accessories',
                    key: 'accessories'
                }
            ]}
        />
    </div>);
}

export default Header;