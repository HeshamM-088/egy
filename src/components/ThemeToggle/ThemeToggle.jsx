import React from "react";
import { useTheme } from "../../hooks/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        bg-gray-700 
        hover:bg-gray-600 
        dark:bg-gray-200 
        dark:hover:bg-gray-300 
        w-10 h-10 
        rounded-full 
        flex items-center justify-center 
        transition-colors duration-200 
        focus:outline-none"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <MoonIcon className="w-6 h-6 text-blue-300" />
      ) : (
        <SunIcon className="w-6 h-6 text-yellow-400" />
      )}
    </button>
  );
}

export default ThemeToggle;
