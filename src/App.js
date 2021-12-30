import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import PostForm from "./components/PostForm";

const NavItem = ({ value, to }) => {
  const commonClasses = "block w-full p-2 transition";
  const linkActive = commonClasses + " bg-blue-500 text-white";
  const linkInactive = commonClasses + " text-gray-500";
  return (
    <NavLink
      className={({ isActive }) => (isActive ? linkActive : linkInactive)}
      to={to}
    >
      {value}
    </NavLink>
  );
};

export default function App() {
  return (
    <div className="flex min-h-screen">
      <div className="py-5 border-r mr-5">
        <div className="sticky top-0">
          <h1 className="p-3 mb-5 font-semibold select-none text-xl text-blue-500">
            Admin
          </h1>
          <ul className="space-y-3 w-36">
            <li>
              <NavItem value="Home" to="/" />
            </li>
            <li>
              <NavItem value="Create Post" to="/create-post" />
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<PostForm />} />
        </Routes>
      </div>
    </div>
  );
}
