"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../muiComponents/ThemeSwitch";

function NavBar() {
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  const navbarToggleButtonHandler = () => {
    setHidden(!hidden);
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 dark:border-b dark:border-b-slate-700">
      <div className="max-w-screen-xl flex flex-wrap md:items-center items-center justify-between mx-auto p-4 md:py-1">
        <Link href="/" className="flex items-center">
          <Image
            // src={"/rms-logo-navbar.png"}
            src={"/rms-logo.svg"}
            height={32}
            width={32}
            alt="Logo"
            className="mr-3"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            RMS
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          onClick={navbarToggleButtonHandler}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="true"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Need to Edit this section  */}
        <div
          className={`${
            !hidden ? "hidden" : null
          }   w-full  md:w-auto md:flex md:items-center`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:items-center">
            <li>
              <Link
                href="/"
                className={`block py-2 pl-3 pr-4 text-gray-900 rounded 
                ${
                  pathname !== `/` && "hover:bg-gray-900 dark:hover:bg-gray-700"
                } 
                md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent 
                ${
                  pathname === "/" &&
                  "md:text-blue-500 bg-blue-700 md:bg-transparent dark:text-blue-500 md:dark:text-blue-500"
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/table-booking"
                className={`block py-2 pl-3 pr-4 text-gray-900 rounded 
                ${
                  pathname !== `/table-booking` &&
                  "hover:bg-gray-900 dark:hover:bg-gray-700"
                } 
                md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent 
                ${
                  pathname === "/table-booking" &&
                  "md:text-blue-500 bg-blue-700 md:bg-transparent dark:text-blue-500 md:dark:text-blue-500"
                }`}
              >
                Book Table
              </Link>
            </li>
            {/* <li>
              <Link
                href="/"
                className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current="page"
              >
                Home
              </Link>
            </li> */}
            <li>
              <Link
                href="#"
                className={`block py-2 pl-3 pr-4 text-gray-900 rounded 
                ${
                  pathname !== `/about` &&
                  "hover:bg-gray-900 dark:hover:bg-gray-700"
                } 
                md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent 
                ${
                  pathname === "/about" &&
                  "md:text-blue-500 bg-blue-700 md:bg-transparent"
                }`}
              >
                About
              </Link>
            </li>

            <li>
              <Link
                href="/cart"
                className={`block py-2 pl-3 pr-4 text-gray-900 rounded 
                ${
                  pathname !== `/cart` &&
                  "hover:bg-gray-900 dark:hover:bg-gray-700"
                } 
                md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500  dark:hover:text-white md:dark:hover:bg-transparent 
                ${
                  pathname === "/cart" &&
                  "md:text-blue-500 bg-blue-700 md:bg-transparent dark:text-blue-500  md:dark:text-blue-500"
                }`}
              >
                Cart
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard"
                className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                dashboard
              </Link>
            </li>
            <div>
              <ThemeSwitch />
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
