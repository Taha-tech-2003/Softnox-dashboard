import React from "react";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputComp, InputPassword } from "../../component/input";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, logout } from "../../store/slices/authSlice";
import { Spin } from 'antd';


const LoginScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const schema = yup.object().shape({
        email: yup.string()
            .required('This field is required')
            .test(
                'is-email-or-username',
                'Input must be a valid email or username (alphanumeric, 3-20 characters)',
                value =>
                    /^[a-zA-Z0-9_.-]{3,20}$/.test(value) ||
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ).min(3),
        password: yup.string().required('Password is required'),
    });


    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const onSubmit = async (data) => {
        const userData = { email: data.email, password: data.password };
        const result = await dispatch(loginUser(userData));
        if (result.payload.status == 200) {
            navigate("/table");
        }
    };

    return (
        <>
            <div className="flex h-screen">
                <div className="flex flex-col justify-center items-center w-full p-8">
                    <div className="w-full max-w-md">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                                <h1 className="text-2xl">T</h1>
                            </div>
                            <h2 className="mt-4 text-2xl font-bold">Welcome Back</h2>
                            <p className="text-gray-500">Please login to your account</p>
                        </div>

                        <div className="mt-6 space-y-4">
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <InputComp contentEditable={loading} error={errors.email?.message} onChange={onChange} value={value} placeholder={"Email address"} type={"email"} />

                                )}
                                name="email"
                            />

                            <div className="relative">
                                <Controller
                                    control={control}
                                    rules={{
                                        required: true,
                                    }}
                                    render={({ field: { onChange, value } }) => (
                                        <InputPassword contentEditable={loading} error={errors.password?.message} onChange={onChange} value={value} placeholder={"Password"} />
                                    )}
                                    name="password"
                                />
                            </div>

                            <div className="flex justify-end text-sm">
                                <button disabled={loading} onClick={() => navigate("/forgotpassword")} className={`${loading ? "cursor-no-drop" : "cursor-pointer"} text-blue-500 outline-0 hover:no-underline`}>
                                    Forgot Password?
                                </button>
                            </div>

                            <button disabled={loading} onClick={handleSubmit(onSubmit)} className={`${loading ? "cursor-no-drop" : "cursor-pointer"} w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-700 transition`}>
                                {loading ? <Spin /> : "Login"}
                            </button>
                            

                            <p className="text-center text-sm mt-4">
                                Don't have an account?{" "}
                                <button disabled={loading} onClick={() => navigate("/signUp")} className={`${loading ? "cursor-no-drop" : "cursor-pointer"} text-blue-500 outline-0 hover:no-underline`}>
                                    Signup
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginScreen;