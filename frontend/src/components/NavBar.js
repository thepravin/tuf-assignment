import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="block w-full max-w-screen-xl px-6 py-3 mx-auto text-black bg-white border shadow-md rounded-xl border-white/80 bg-opacity-80 backdrop-blur-2xl backdrop-saturate-200">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link
          to={"/"}
          className="mr-4 block cursor-pointer py-1.5 font-sans  font-bold text-xl leading-relaxed tracking-normal text-inherit antialiased"
        >
          TUF
        </Link>
        <div className="hidden lg:block">
          <ul className="flex flex-col gap-2 my-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <Link
                to={"/"}
                className="flex items-center transition-colors hover:text-blue-500"
              >
                Code Form
              </Link>
            </li>
            <li className="block p-1 font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
              <Link
                to={"/codeentries"}
                className="flex items-center transition-colors hover:text-blue-500"
              >
                Code Entries
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
