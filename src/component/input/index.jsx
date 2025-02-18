import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const InputComp = ({ type, placeholder, value, onChange, error,contentEditable }) => {
    return (
        <input disabled={contentEditable} type={type} placeholder={placeholder} onChange={onChange} value={value} style={{ backgroundColor: '#f5f7f9' }} className={`${error !== undefined ? "border-red-500" : 'border-transparent'} border w-full px-4 py-4 outline-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-transparent`} />
    )
}

const InputPassword = ({ placeholder, value, onChange, error,contentEditable }) => {
    const [visible, setVisible] = useState(true)
    return (
        <div className="relative">
            <input disabled={contentEditable} type={visible ? "password" : "text"} placeholder={placeholder} onChange={onChange} value={value} style={{ backgroundColor: '#f5f7f9' }} className={`${error !==undefined ? "border-red-500 " : 'border-transparent'} border w-full px-4 py-4 outline-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-transparent`} />
            <button onClick={() => setVisible(!visible)}>
                {!visible ?
                    <IoEyeOutline className="absolute text-2xl right-2.5 bottom-4" />
                    :
                    <IoEyeOffOutline className="absolute text-2xl right-2.5 bottom-4" />
                }
            </button>
        </div>
    )
}

export { InputComp, InputPassword }