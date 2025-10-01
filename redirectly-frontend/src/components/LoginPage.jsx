import React from 'react'
import { useState , useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import TextField from './TextField'
import api from '../api/api'
import toast from 'react-hot-toast'
import { ContextApi } from '../contextApi/ContextApi'

const LoginPage = () => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
    const { token, setToken } = useContext(ContextApi);
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

    const loginHandler = async (data) => {
        setLoader(true);
        try {
            const response = await api.post("/api/auth/public/login", data);
            setToken(response.data.token);
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.data.token));
            toast.success("Logged in Successfully!");
            reset();
            navigate("/dashboard");
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
            <form onSubmit={handleSubmit(loginHandler)}
                className="sm:w-[450px] w-[360px]  shadow-custom py-8 sm:px-8 px-4 rounded-md">
                <h1 className="text-center font-serif text-btnColor font-bold lg:text-3xl text-2xl">
                    Login Here
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
                        variant="login"
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
                        variant="login"
                        errors={errors}
                    />
                </div>

                <button
                    disabled={loader}
                    type='submit'
                    className='bg-customRed font-semibold text-white  bg-custom-gradient w-full py-2 hover:text-slate-400 transition-colors duration-100 rounded-sm my-3'>
                    {loader ? "Loading..." : "Login"}
                </button>

                <p className='text-center text-sm text-slate-700 mt-6'>
                    Don't have an account?
                    <Link
                        className='font-semibold underline hover:text-black'
                        to="/register">
                        <span className='text-btnColor'> Sign Up</span>
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage