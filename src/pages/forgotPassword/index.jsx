import React from "react";
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputComp, InputPassword } from "../../component/input";
import { useNavigate } from "react-router";


const ForgotPassword = () => {
    const navigate = useNavigate();
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
        console.log(data.email,data.password)
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
                            <h2 className="mt-4 text-2xl font-bold">Forgot Your Password?</h2>
                            <p className="text-gray-500 text-center">No worries! Enter your email below, and we’ll send you instructions to reset your password.</p>
                        </div>

                        <div className="mt-6 space-y-4">
                            <Controller
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({ field: { onChange, value } }) => (
                                    <InputComp onChange={onChange} value={value} placeholder={"Email address"} type={"email"} />

                                )}
                                name="email"
                            />

                            <button onClick={handleSubmit(onSubmit)} className="w-full bg-blue-500 text-white py-4 rounded-lg hover:bg-blue-700 transition">
                                Sent email
                            </button>


                            <p className="text-center text-sm mt-4">
                                Already have account?{" "}
                                <button onClick={() => navigate("/login")} className="text-blue-500 cursor-pointer outline-0 hover:no-underline">
                                    Login
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword;