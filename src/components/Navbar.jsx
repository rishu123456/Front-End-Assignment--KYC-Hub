import React, { useState } from 'react';
import { Layout, Avatar, Dropdown, Modal } from 'antd';
import { LayoutDashboard, User, Info } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const { Header } = Layout;

const Navbar = () => {
  const location = useLocation();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const handleMenuClick = (key) => {
    switch (key) {
      case 'profile':
        setIsProfileModalOpen(true);
        break;
      case 'about':
        setIsAboutModalOpen(true);
        break;
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <User size={16} />,
      onClick: () => handleMenuClick('profile')
    },
    {
      key: 'about',
      label: 'About App',
      icon: <Info size={16} />,
      onClick: () => handleMenuClick('about')
    },
    {
      type: 'divider'
    },
  ];

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Product Details';
      case '/compare':
        return 'Compare Products';
      default:
        return 'ProductHub';
    }
  };

  return (
    <>
      <Header className="bg-white shadow-md px-6 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <LayoutDashboard className="text-blue-600" size={24} />
            <span className="text-xl font-semibold text-gray-800">ProductHub</span>
          </Link>
          <h1 className="text-lg font-medium text-gray-600">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Dropdown
            menu={{ items: userMenuItems }}
            trigger={['click']}
            placement="bottomRight"
          >
            <Avatar 
                src="https://res.cloudinary.com/dhqxvmvla/image/upload/v1740666655/dixpz9jkvtgla59mpg74.jpg"
                className="cursor-pointer hover:opacity-80 transition-opacity"
            />
          </Dropdown>
        </div>
      </Header>

      <Modal
        title="Profile Details"
        open={isProfileModalOpen}
        onCancel={() => setIsProfileModalOpen(false)}
        footer={null}
      >
        <p><strong>Name:</strong> Rishu Rai</p>
        <p><strong>Email:</strong> rishu25112001@gmail.com</p>
        <p><strong>Bio:</strong> A passionate developer working on ProductHub.</p>
      </Modal>

      <Modal
        title="About ProductHub"
        open={isAboutModalOpen}
        onCancel={() => setIsAboutModalOpen(false)}
        footer={null}
      >
        <p><strong>Version:</strong> 1.0.0</p>
        <p><strong>Description:</strong> ProductHub is a platform that allows users to explore and compare products effortlessly.</p>
        <p><strong>Contact:</strong> rishu25112001@gmail.com</p>
      </Modal>
    </>
  );
};

export default Navbar;
