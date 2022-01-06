import React from "react";
import { AiFillFileAdd, AiOutlineHome } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

const NavItem = ({ closed, value, to, Icon }) => {
  const commonClasses =
    "block w-full p-2 transition flex items-center space-x-2 whitespace-nowrap";
  const linkActive = commonClasses + " bg-blue-500 text-white";
  const linkInactive = commonClasses + " text-gray-500";
  return (
    <NavLink
      className={({ isActive }) => (isActive ? linkActive : linkInactive)}
      to={to}
    >
      {Icon}
      <span
        className={
          closed
            ? "w-0 overflow-hidden transition-width break-normal"
            : "w-full overflow-hidden transition-width break-normal"
        }
      >
        {value}
      </span>
    </NavLink>
  );
};

export default function Navbar({ closed }) {
  return (
    <div className="">
      <Link to="/">
        <h1
          className={
            (closed ? "text-base" : "text-xl") +
            " p-2 mb-5 font-semibold select-none text-blue-500"
          }
        >
          Admin
        </h1>
      </Link>
      <ul className="space-y-3 w-full">
        <li>
          <NavItem
            value="Home"
            to="/"
            Icon={<AiOutlineHome size={24} />}
            closed={closed}
          />
        </li>
        <li>
          <NavItem
            value="Create Post"
            to="/create-post"
            Icon={<AiFillFileAdd size={24} />}
            closed={closed}
          />
        </li>
      </ul>
    </div>
  );
}
