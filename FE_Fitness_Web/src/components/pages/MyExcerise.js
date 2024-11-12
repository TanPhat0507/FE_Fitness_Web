import React from 'react';
// , { useState, useEffect, useContext }
import { Layout, Menu, Avatar, Button, Table, DatePicker, notification } from 'antd';
import { UserOutlined, CalendarOutlined, LogoutOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
// import '../../styles/pages/MyExcerise.css';


// import { DateContext } from './DateContext'; // Đường dẫn đã được sửa

// import deleteIcon from '../../images/Delete.svg';
// import editIcon from '../../images/Edit.svg';
//Layout
const { Header, Content, Sider } = Layout;
//Modal
const MyMeal = () => {

    // Toggle Modal 1
    // const toggleModal = () => {
    //     setModal(!modal);
    //     setModal2(false);
    // };

    // // Toggle Modal 2
    // const toggleModal2 = (event) => {
    //     setModal2(!modal2);
    //     setModal(false);
    //     const exceriseValue = event.target.getAttribute('data-value');
    //     setexceriseid(exceriseValue);
    //     console.log(`Value of excersise: ${exceriseValue}`);
    // };

    // const toggleModal3 = (event) => {
    //     setModal2(!modal2);
    //     setModal(false);
    // };

    // const toggleModal4 = () => {
    //     setModal4(!modal4);
    // };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider width={200} className="site-layout-background">
                <div className="logo">Nutritioners</div>
                <Menu mode="inline" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link to="/">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<PieChartOutlined />}>
                        <Link to="/my-excerise">My Excerise</Link>
                    </Menu.Item>
                    <Menu.Item key="3">
                        <Link to="/my-report">Report</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<LogoutOutlined />}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Content style={{ padding: '16px 24px', backgroundColor: '#F2F5FD' }}>
                    <div className='mymeal'>
                        <div className='control'>
                            <h1 className="meal-title">My Excersise</h1>
                            <Button className='btn-modal' classtype="primary" Open>+ Add new excerise</Button>
                        </div>


                        <DatePicker />

                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default MyMeal;