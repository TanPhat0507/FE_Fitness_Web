

import React from "react";
import edit from "../../images/Edit.svg";
import '../../styles/pages/Setting.css';
// {/* <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
// <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> */}
const Setting = () => {
    return (
        <div className="setting">
            <h1 className="setting-title">Settings</h1>
            <div className="setting-body">
                {/* Name Section */}
                <div className="name">
                    <p className="title-input">Name</p>
                    <input type="text" className="name-input" />
                    <img src={edit} alt="edit" className="edit-icon-name" />
                </div>

                {/* Email Section */}
                <div className="email">
                    <p className="title-input">Email</p>
                    <input type="email" className="email-input" />
                    <img src={edit} alt="edit" className="edit-icon-email" />

                </div>

                {/* Password Section */}
                <div className="password">
                    <p className="title-input">Password</p>
                    <input type="password" className="password-input" />
                    <img src={edit} alt="edit" className="edit-icon-password" />
                </div>
            </div>
        </div>
    );
};
export default Setting;
