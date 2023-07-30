'use client'
import React, { useState } from "react";

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <div className="bg-gray-100">
        {/* Collapsible Sidebar */}
        {isSidebarOpen && (
          <nav className="bg-indigo-600 text-white h-screen w-56 py-8 fixed top-0 left-0">
            <div className="flex items-center justify-center mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full"
                viewBox="0 0 24 24"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
              <h1 className="ml-2 text-xl font-bold">Your App</h1>
            </div>
            <ul className="space-y-4">
              <li className="p-2 hover:bg-blue-700 transition-colors">
                <a href="#home">Home</a>
              </li>
              <li className="p-2 hover:bg-blue-700 transition-colors">
                <a href="#about">About</a>
              </li>
              <li className="p-2 hover:bg-blue-700 transition-colors">
                <a href="#services">Services</a>
              </li>
              <li className="p-2 hover:bg-blue-700 transition-colors">
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </nav>
        )}

        <main className={isSidebarOpen ? "ml-64 p-8" : "ml-20 p-8"}>
          {/* Button to toggle Sidebar */}
          <button
            className="fixed top-8 left-4 bg-indigo-600 text-white px-4 py-2 rounded-md"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
          </button>

          {/* Content */}
          <h2 id="home" className="text-3xl font-bold mb-4">
            Home
          </h2>
          <p>Content for the Home section goes here.</p>

          <h2 id="about" className="text-3xl font-bold my-4">
            About
          </h2>
          <p>Content for the About section goes here.</p>

          <h2 id="services" className="text-3xl font-bold my-4">
            Services
          </h2>
          <p>Content for the Services section goes here.</p>

          <h2 id="contact" className="text-3xl font-bold my-4">
            Contact
          </h2>
          <p>Content for the Contact section goes here.</p>
        </main>
      </div>
    </>
  );
};

export default Header;
