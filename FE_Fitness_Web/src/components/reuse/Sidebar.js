import React, { useState, useEffect } from 'react';
import { Menu } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import dashboard from '../../images/Dashboard.svg';
import exercise from '../../images/Excerise.svg';
import report from '../../images/Report.svg';
import setting from '../../images/Settings.svg';
import logout from '../../images/Logout.svg';
import logo from '../../images/Logo.svg';
import '../../styles/reuse/Sidebar.css'; // Make sure to include your CSS file here

const SideBar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            if (window.innerWidth > 768) {
                setIsCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {isMobile && (
                <div className="menu-icon" onClick={toggleSidebar}>
                    <MenuOutlined />
                </div>
            )}

            <div className={`sidebar ${isMobile && isCollapsed ? 'collapsed' : ''}`}>
                <div className="logo">
                    <img src={logo} alt="Logo" className="logo-img" />
                </div>

                <Menu mode="vertical" defaultSelectedKeys={['1']} className="menu">
                    <Menu.Item key="1">
                        <Link to="/dashboard">
                            <img src={dashboard} alt="Dashboard" className="icon" />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to="/myexercise">
                            <img src={exercise} alt="My Exercise" className="icon" />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <img src={report} alt="Report" className="icon" />
                    </Menu.Item>
                    <Menu.Item key="4">
                        <Link to="/setting">
                            <img src={setting} alt="Setting" className="icon" />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="5">
                        <img src={logout} alt="Log Out" className="icon" />
                    </Menu.Item>
                </Menu>
            </div>
        </>
    );
};

export default SideBar;
