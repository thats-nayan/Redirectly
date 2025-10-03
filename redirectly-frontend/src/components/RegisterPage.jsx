import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import TextField from './TextField'
import api from '../api/api'
import toast from 'react-hot-toast'

const RegisterPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
        mode: "onTouched",
    });

    const registerHandler = async (data) => {
        setLoader(true);
        try {
            await api.post("/api/auth/public/register", data);
            reset();
            navigate("/login");
            toast.success("Registered Successfully! Please login.");
        } catch (error) {
            console.log(error);
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data);
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setLoader(false);
        }
    }

    return (
        <div
            className='min-h-screen py-12 flex justify-center items-center'>
            <form onSubmit={handleSubmit(registerHandler)}
                className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4 rounded-md">
                <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
                    Register Here
                </h1>

                <hr className='mt-2 mb-5 text-black' />

                <div className="flex flex-col gap-3">
                    <TextField
                        label="Username"
                        required
                        id="username"
                        type="username"
                        message="*Username is required"
                        placeholder="Type your username"
                        register={register}
                        variant="register"
                        errors={errors}
                    />

                    <TextField
                        label="Email"
                        required
                        id="email"
                        type="email"
                        message="*Email is required"
                        placeholder="Type your email"
                        register={register}
                        variant="register"
                        errors={errors}
                    />

                    <TextField
                        label="Password"
                        required
                        id="password"
                        type="password"
                        message="*Password is required"
                        placeholder="Type your password"
                        register={register}
                        variant="register"
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    type='submit'
                    className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                    {loader ? "Loading..." : "Register"}
                </button>

                <p className='text-center text-sm text-slate-700 mt-6'>
                    Already have an account?
                    <Link
                        className='font-semibold underline hover:text-black'
                        to="/login">
                        <span className='text-btnColor'> Login</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterPage