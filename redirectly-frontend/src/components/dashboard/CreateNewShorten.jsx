import React from 'react'
import { ContextApi } from "../../contextApi/ContextApi";
import { useContext } from "react";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import TextField from "../TextField";
import { RxCross2 } from "react-icons/rx";
import Tooltip from '@mui/material/Tooltip';
import api from '../../api/api';
import toast from 'react-hot-toast'


const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useContext(ContextApi);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true)
    try {
      const response = await api.post("/api/urls/shorten", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })

      const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${response.data.shortUrl}`}`;

      // Copy to clipboard
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short URL Copied to Clipboard", {
          position: "bottom-center",
          className: "mb-5",
          duration: 3000,
        });
      });

      // await refetch();
      reset();
      setOpen(false);

    } catch (error) {
      console.log(error);
      toast.error("Failed to create short URL. Please try again.",)
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className=" flex justify-center items-center bg-white rounded-md">
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[450px] w-[360px] relative  shadow-custom pt-8 pb-5 sm:px-8 px-4 rounded-lg"
      >

        <h1 className="font-montserrat sm:mt-0 mt-3 text-center  font-bold sm:text-2xl text-[22px] text-slate-800 ">
          Create New Shorten Url
        </h1>

        <hr className="mt-2 sm:mb-5 mb-3 text-slate-950" />

        <div>
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="Url is required"
            register={register}
            errors={errors}
            variant="register"
          />
        </div>

        <button
          className="bg-customRed font-semibold text-white w-32  bg-custom-gradient  py-2  transition-colors  rounded-md my-3"
          type="text"
        >
          {loading ? "Loading..." : "Create"}
        </button>

        {!loading && (
          <Tooltip title="Close">
            <button
              disabled={loading}
              onClick={() => setOpen(false)}
              className=" absolute right-2 top-2  "
            >
              <RxCross2 className="text-slate-800   text-3xl" />
            </button>
          </Tooltip>
        )}

      </form>
    </div>
  )
}

export default CreateNewShorten