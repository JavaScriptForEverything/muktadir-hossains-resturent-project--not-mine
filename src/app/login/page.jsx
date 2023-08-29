"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useInput from "@/hooks/useInput";
import { useState } from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import Colors from "@/assets/Colors";

const Login = () => {
  const router = useRouter();
  const [isSendingRequest, setIsSendingRequest] = useState(false);

  const { input: from, inputChangeHandler } = useInput({
    userName: "",
    password: "",
  });

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      setIsSendingRequest(true);
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        from
      );
      console.log(res);
      // && res?.data?.role==="admin"
      if (res.data.success === true && res?.data?.token) {
        // Save token to cookies with a key 'token' (you can use any key name you prefer)
        // Cookies.set("Ltoken", res.data.token);
        console.log("ttttttttttt")
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSendingRequest(false);
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <form onSubmit={submitHandler}>
        <div className="bg-gray-300 p-8 rounded-lg w-full">
          <h2 className="text-center py-3 mb-4 text-xl font-semibold">
            Login To Your Account
          </h2>
          <div className="mb-4">
            <label
              htmlFor="userName"
              className="block text-sm font-medium text-gray-700"
            >
              Email or Phone Number
            </label>
            <input
              onChange={inputChangeHandler}
              type="text"
              name="userName"
              id="userName"
              placeholder="Enter your email here..."
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 placeholder:grey-500::placeholder text-sm"
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
              onChange={inputChangeHandler}
              placeholder="Enter Password..."
              type="password"
              name="password"
              id="password"
              className="mt-1 p-2 block w-full rounded-md border border-gray-300 focus:ring-green-500 focus:border-green-500 placeholder-gray-500::placeholder text-sm "
            />
          </div>
          <div className="flex justify-center">
            <LoadingButton
              size="small"
              onClick={submitHandler}
              loading={isSendingRequest}
              sx={{
                color: Colors.white,
                backgroundColor: `#4F47E4 !important`,
                "&:hover": {
                  // backgroundColor: "orange",
                },
              }}
              variant="contained"
            >
              <span>Login</span>
            </LoadingButton>
            {/* <button className="bg-green-500 hover:bg-green-600  rounded px-5 py-2 mt-5 text-sm font-semibold transition-colors">
              {isSendingRequest ? "Logging In..." : "Login"}
            </button> */}
          </div>
          <div className="mt-5 flex justify-between">
            <h6 className="text-violet-500 hover:text-violet-900 cursor-pointer text-sm font-mono">
              Forgot password?
            </h6>
            <h5 className="text-violet-500 hover:text-violet-900 cursor-pointer text-sm underline font-mono">
              <Link href={"/sign-up"}>Sign Up</Link>
            </h5>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
