import React, { useState, useEffect } from 'react';
// import '../../styles/Sidebar.css'; // Import your CSS styles
import { Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { Link } from 'react-router-dom';

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Check if screen width is 768px or less
            if (window.innerWidth > 768) {
                setIsCollapsed(false); // Sidebar always visible on larger screens
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check on component mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Hamburger button only visible on mobile */}
            {isMobile && (
                <div className="hamburger" onClick={toggleSidebar}>
                    <MenuOutlined />
                </div>
            )}

            {/* Sidebar */}
            <div className={`sidebar ${isMobile && isCollapsed ? 'collapsed' : ''}`}>

                <div className="logo">
                    <img src={logoImage} alt="Logo" className="logo-img" />
                </div>

                <Menu mode="vertical" defaultSelectedKeys={['1']} className="menu">
                    <Menu.Item key="1">
                        <Link to="/dashboard">
                            <img src={dashboardIcon} alt="Dashboard" style={{ width: '20px', marginRight: '10px' }} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/my-excersise">
                            <img src={mealIcon} alt="My Excersise" style={{ width: '20px', marginRight: '10px' }} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <img src={reportIcon} alt="My Report" style={{ width: '20px', marginRight: '10px' }} />
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/settings">
                            <img src={settIcon} alt="My Setting" style={{ width: '20px', marginRight: '10px' }} />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        {/* <Link to="/setting"> */}
                        <img src={settIcon} alt="Log Out" style={{ width: '20px', marginRight: '10px' }} />
                        {/* </Link> */}
                    </Menu.Item>
                </Menu>
            </div>
        </>
    );
};

export default SideBar;
