import React from "react";
import { Link, NavLink } from "react-router-dom";

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

export default function Navbar() {
  return (
    <div className="py-5 border-r ">
      <div className="sticky top-0">
        <Link to="/">
          <h1 className="p-3 mb-5 font-semibold select-none text-xl text-blue-500">
            Admin
          </h1>
        </Link>
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
  );
}
