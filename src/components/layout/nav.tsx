
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Menu } from 'antd';
import { AreaChartOutlined, SmileOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu, Item } = Menu;

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const Nav = () => {
  const [openKeys, setOpenKeys] = useState(['sub1']);

  const onOpenChange = (keys: any) => {
    const latestOpenKey = keys.find((key: string) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey as string) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu mode="inline" openKeys={openKeys} onOpenChange={onOpenChange} style={{ width: 256 }}>
      <SubMenu key="sub1" icon={<SmileOutlined style={{ fontSize: '25px', top: '5px', position: 'relative' }} />} title="新单词">
        <Item key="/study">
          <Link to="/study">学习新单词</Link>
        </Item>
      </SubMenu>
      <SubMenu key="sub2" icon={<AreaChartOutlined style={{ fontSize: '25px', top: '5px', position: 'relative' }} />} title="旧单词">
        <Item key="/review-today">
          <Link to="/review-today">今日复习</Link>
        </Item>
        <Item key="/review-all">
          <Link to="/review-all">全部复习</Link>
        </Item>
      </SubMenu>
      <SubMenu key="sub4" icon={<SettingOutlined style={{ fontSize: '25px', top: '5px', position: 'relative' }} />} title="管理">
        <Item key="9">Option 9</Item>
        <Item key="10">Option 10</Item>
        <Item key="11">Option 11</Item>
        <Item key="12">Option 12</Item>
      </SubMenu>
    </Menu>
  );
};

export default Nav;
