import React from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Collapse,
} from "@material-tailwind/react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  MapPinIcon,
  CalendarIcon,
  InformationCircleIcon,
  UserIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

export default function Header() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-8">
      {/* Home */}
      <li className="flex items-center gap-x-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-teal-500 px-4 text-white py-2 rounded-lg flex items-center gap-x-2"
              : "flex items-center gap-x-2 text-gray-700 hover:text-teal-500 transition-colors"
          }
        >
          <HomeIcon className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">Home</span>
        </NavLink>
      </li>

      {/* Destinations */}
      <li className="flex items-center gap-x-2">
        <NavLink
          to="/places"
          className={({ isActive }) =>
            isActive
              ? "bg-teal-500 px-4 py-2 rounded-lg flex items-center gap-x-2 text-white"
              : "flex items-center gap-x-2 text-gray-700 hover:text-teal-500 transition-colors"
          }
        >
          <MapPinIcon className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">Places </span>
        </NavLink>
      </li>

      {/* Culture */}
      <li className="flex items-center gap-x-2">
        <NavLink
          to="/culture"
          className={({ isActive }) =>
            isActive
              ? "bg-teal-500 px-4 py-2 rounded-lg flex items-center gap-x-2 text-white"
              : "flex items-center gap-x-2 text-gray-700 hover:text-teal-500 transition-colors"
          }
        >
          <CalendarIcon className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">Culture</span>
        </NavLink>
      </li>

      {/* About */}
      <li className="flex items-center gap-x-2">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "bg-teal-500 px-4 py-2 rounded-lg flex items-center gap-x-2 text-white"
              : "flex items-center gap-x-2 text-gray-700 hover:text-teal-500 transition-colors"
          }
        >
          <InformationCircleIcon className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">About</span>
        </NavLink>
      </li>

      {/* Contact */}
      <li className="flex items-center gap-x-2">
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive
              ? "bg-teal-500 px-4 py-2 rounded-lg flex items-center gap-x-2 text-white"
              : "flex items-center gap-x-2 text-gray-700 hover:text-teal-500 transition-colors"
          }
        >
          <EnvelopeIcon className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">Contact</span>
        </NavLink>
      </li>

      {/* Profile */}
      <li className="flex items-center gap-x-2">
        <NavLink
          to="/user-profile"
          className={({ isActive }) =>
            isActive
              ? "bg-teal-500 px-4 py-2 rounded-lg flex items-center gap-x-2 text-white"
              : "flex items-center gap-x-2 text-gray-700 hover:text-teal-500 transition-colors"
          }
        >
          <UserIcon className="w-4 h-4 flex-shrink-0" />
          <span className="font-medium">Profile</span>
        </NavLink>
      </li>
    </ul>
  );

  return (
    <header className="shadow-lg sticky top-0 left-0 right-0 z-50 bg-white  ">
      <Navbar className="mx-auto   shadow-none px-4 py-2 lg:px-8 lg:py-4 ">
        <div className="container mx-auto flex items-center justify-between  text-blue-gray-900">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-x-2">
            <div className="bg-teal-500 w-8 h-8 rounded-lg flex items-center justify-center">
              <MapPinIcon className="w-5 h-5 text-white flex-shrink-0" />
            </div>
            <Typography
              as="span"
              className="cursor-pointer py-1.5 font-bold text-xl"
            >
              <span className="text-gray-800">EGY-</span>
              <span className="text-teal-500">Guide</span>
            </Typography>
          </NavLink>
          <div className="hidden lg:block">{navList}</div>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <div className="container mx-auto">{navList}</div>
        </Collapse>
      </Navbar>
    </header>
  );
}
