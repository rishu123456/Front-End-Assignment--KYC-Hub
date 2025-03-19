import React from 'react';
import { Layout, Menu } from 'antd';
import { Box, BarChart2 } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    {
      key: '/',
      icon: <Box size={18} />,
      label: 'Product Details'
    },
    {
      key: '/compare',
      icon: <BarChart2 size={18} />,
      label: 'Compare Products'
    }
  ];

  return (
    <Sider theme="light" className="shadow-lg">
      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={items}
        onClick={({ key }) => navigate(key)}
        className="h-full border-r"
      />
    </Sider>
  );
};

export default Sidebar;