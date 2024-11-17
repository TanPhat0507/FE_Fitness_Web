import React, { useState, useEffect } from "react";
import edit from "../../images/Edit.svg";
import { message, Button } from 'antd';

import '../../styles/pages/Setting.css';
// {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> */}
const Setting = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const token = localStorage.getItem("token");
    const [modal1, setModal1] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [modal3, setModal3] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);

    console.log("Token:", token);

    // Fetch user data (GET request)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/users`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();
                console.log('User Data:', data);
                if (response.ok) {
                    const userData = data.user;
                    // const goalData = data.goal; // Use the first goal if available
                    // console.log('User Data:', userData);
                    // console.log('Goal Data:', goalData);

                    setName(userData.name);
                    setEmail(userData.email);
                } else {
                    console.error('Failed to fetch user data:', data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUserData();
    }, [token]);



    const toggleModal1 = () => setModal1(!modal1);
    const toggleModal2 = () => setModal2(!modal2);
    const toggleModal3 = () => setModal3(!modal3);

    // Update user data (PUT request)
    const updateUserData = () => {
        const updatedData = {
            name,
            email,
            password,
        };

        fetch(`http://localhost:3000/api/users/setting`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
            .then(response => {
                if (response.ok) {
                    message.success("Information updated successfully!");
                    setIsDisabled(true); // Disable fieldsets after update
                } else {
                    throw new Error("Update failed");
                }
            })
            .catch(error => {
                console.error("Error updating user data:", error);
                message.error("Update failed, please try again.");
            });
    };

    return (
        <div className="setting">
            <h1 className="setting-title">Settings</h1>
            <div className="setting-body">
                {/* Name Section */}
                <div className="name">
                    <p className="title-input">Name</p>
                    <input type="text" className="name-input" />
                    <img onClick={toggleModal1} src={edit} alt="edit" className="edit-icon-name" />
                    {modal1 && (
                        <div className="modal">
                            <div onClick={toggleModal1} className="overlay"></div>
                            <div className="modal-content">
                                <h3>Change name</h3>
                                <div className="name-container">
                                    <div className="name-input-again">Enter your new name</div>
                                    <input type="text" className="name-input1" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="modal-btn">
                                    <button className="cancel-modal" onClick={toggleModal1}>Cancel</button>
                                    <button className="save-modal" onClick={updateUserData}>Save</button>
                                </div>
                                <Button className="close-button" onClick={toggleModal1} classtype="secondary">X</Button>

                            </div>
                        </div>
                    )}
                </div>

                {/* Email Section */}
                <div className="email">
                    <p className="title-input">Email</p>
                    <input type="email" className="email-input" />
                    <img onClick={toggleModal2} src={edit} alt="edit" className="edit-icon-email" />
                    {modal2 && (
                        <div className="modal">
                            <div onClick={toggleModal2} className="overlay"></div>
                            <div className="modal-content">
                                <h3>Change email address</h3>
                                <div className="name-container">
                                    <div className="email-input-again">Enter your new email address</div>
                                    <input type="email" className="email-input1" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="modal-btn">
                                    <button className="cancel-modal" onClick={toggleModal2}>Cancel</button>
                                    <button className="save-modal" onClick={updateUserData}>Save</button>
                                </div>
                                <Button className='close-button' onClick={toggleModal2} >X</Button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Password Section */}
                <div className="password">
                    <p className="title-input">Password</p>
                    <input type="password" className="password-input" />
                    <img onClick={toggleModal3} src={edit} alt="edit" className="edit-icon-password" />
                    {modal3 && (
                        <div className="modal">
                            <div onClick={toggleModal3} className="overlay"></div>
                            <div className="modal-content-1">
                                <h3>Change your password</h3>
                                <div className="name-container">
                                    <div className="password-input-again">Current password</div>
                                    <input type="password" className="password-input1" />
                                    <div className="password-input-again">New password</div>
                                    <input type="password" className="password-input1" onChange={(e) => setPassword(e.target.value)} />
                                    <div className="password-input-again">Confirm new password</div>
                                    <input type="password" className="password-input1" />
                                </div>
                                <div className="modal-btn">
                                    <button className="cancel-modal1" onClick={toggleModal3}>Cancel</button>
                                    <button className="save-modal1" onClick={updateUserData}>Save</button>
                                </div>
                                <Button className="close-button" onClick={toggleModal3} classtype="secondary">X</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Setting;
