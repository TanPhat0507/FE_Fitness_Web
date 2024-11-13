import React from 'react';
// , { useState, useEffect, useContext }
import { Layout, Menu, Avatar, Button, Table, DatePicker, notification } from 'antd';
import { UserOutlined, CalendarOutlined, LogoutOutlined, PieChartOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import '../../styles/pages/MyExcerise.css';


// import { DateContext } from './DateContext'; // Đường dẫn đã được sửa

// import deleteIcon from '../../images/Delete.svg';
// import editIcon from '../../images/Edit.svg';
//Layout

//Modal
const MyExcerise = () => {

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
        <div className='myexcersise'>
            <div className='control'>
                <h1 className="excersise-title">My Excersise</h1>
                <Button className='btn-modal' classtype="primary" Open>+ Add new excerise</Button>
            </div>
            <DatePicker />
        </div>
    );
};
export default MyExcerise;