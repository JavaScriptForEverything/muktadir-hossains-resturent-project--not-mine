"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import useInput from "@/hooks/useInput";

const SignUp = () => {
  const router = useRouter();
    const [isSendingRequest, setIsSendingRequest] = useState(false);

  const FromInitialData = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const { input: fromData, inputChangeHandler } = useInput(FromInitialData);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsSendingRequest(true);
      const res = await axios.post(
        "http://localhost:3000/api/users/sign-up",
        fromData
      );
      if (res.status === 201) {
        toast.success("Account Created Successfully", {
          duration: 2000, // Duration in milliseconds
          position: "top-right", // Toast position (top-left, top-right, bottom-left, bottom-right)
        });
        router.push("/login");
        // Show a success toast
      }
      if (res.status === 400 || res.status === 500) {
        router.refresh();
        console.log("Request failed");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        duration: 3000, // Duration in milliseconds
        position: "top-right", // Toast position (top-left, top-right, bottom-left, bottom-right)
      });
      router.refresh();
    }finally{
      setIsSendingRequest(false)
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={handleFormSubmit}>
        <div className="bg-gray-300 p-8 rounded-lg">
          <h2 className="text-center py-2 mb-4 text-xl font-semibold">
            Create Account
          </h2>
          <div className="flex justify-between pb-4">
            <div className="">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your First Name here..."
                required
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 placeholder:grey-500::placeholder text-sm"
                onChange={inputChangeHandler}
              />
            </div>
            <div className="ml-3">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                required
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter Last Name..."
                className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 placeholder:grey-500::placeholder text-sm"
                onChange={inputChangeHandler}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email here..."
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 placeholder:grey-500::placeholder text-sm"
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Phone Number
            </label>
            <input
              placeholder="01xxxxxxxxx"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              pattern="[0-9]*"
              maxLength="11"
              // onInput="this.value = this.value.replace(/[^0-9+]/g, '').substring(0, 14);"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 placeholder-gray-500::placeholder text-sm "
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              required
              placeholder="Enter Password..."
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 placeholder-gray-500::placeholder text-sm "
              onChange={inputChangeHandler}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              required
              placeholder="Enter Password..."
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 placeholder-gray-500::placeholder text-sm "
              onChange={inputChangeHandler}
            />
            {fromData.password !== fromData.confirmPassword && (
              <p className="text-xs text-red-600 pl-1 pt-1">
                Password & Confirm Password Must Match.*
              </p>
            )}
          </div>
          <div className="flex justify-center">
            <button className="bg-green-500 hover:bg-green-600  rounded px-5 py-2 mt-5 text-sm font-semibold transition-colors">
              {isSendingRequest ? "Singing Up..." : "Sign Up"}
            </button>
          </div>
          <div className="mt-5 flex justify-between">
            <h6 className="text-violet-500 hover:text-violet-900 cursor-pointer text-sm font-mono">
              Already Have an account?
            </h6>
            <h5 className="text-violet-500 hover:text-violet-900 cursor-pointer text-sm underline font-mono">
              <Link href={"/login"}>Login</Link>
            </h5>
          </div>
        </div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </form>
    </div>
  );
};

export default SignUp;
