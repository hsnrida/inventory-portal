import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-sky-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link
                  to="/products"
                  className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-sky-400 focus:outline-none focus:bg-sky-400"
                >
                  Products
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden sm:block sm:ml-6">
            <div className="flex space-x-4">
              <Link
                to="/logout"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-sky-400 focus:outline-none focus:bg-sky-400"
              >
                Sign out
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
