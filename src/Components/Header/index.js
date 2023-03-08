import {Menu} from 'antd';
function Header() {
    return (  <div className="header">
        <Menu
            items={[
                {
                    label:'Home',
                    key:'home'
                },
                {
                    label:'Men',
                    key:'men'
                },
                {
                    label:'Women',
                    key:'women'
                },
                {
                    label:'Accessories',
                    key:'accessories'
                }
            ]}
        />
    </div>);
}

export default Header;