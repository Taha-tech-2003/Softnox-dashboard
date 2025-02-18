import React from "react";
import { Dropdown, Space } from 'antd';
import { LuUser } from "react-icons/lu";
import { useNavigate } from "react-router";

const Header = () => {
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userName");
        window.location.href = "/";
    };
    const items = [
        {
            key: '1',
            label: (
                <a >
                    {localStorage.getItem("userName") == null ? "Taha Tahir" : localStorage.getItem("userName")}
                </a>
            ),
        },
        {
            key: '2',
            danger: true,
            label: (
                <button onClick={handleLogout} className="font-medium">
                    Logout
                </button>
            ),
        },
    ];
    return (
        <header className="bg-blue-500 text-white py-4 px-6 flex justify-between items-center shadow-lg">
            <h1 className="text-2xl font-bold">Mockapi.io</h1>
            <div className="flex space-x-6">
                <Dropdown
                    overlayStyle={{ cursor: 'pointer' }}
                    menu={{
                        items,
                    }}
                >
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <LuUser className="text-4xl text-black" />
                    </div>
                </Dropdown>
            </div>
        </header>
    );
};

export default Header;
