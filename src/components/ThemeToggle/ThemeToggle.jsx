import React from "react";
import { useTheme } from "../../hooks/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        relative
        flex items-center justify-center
        w-10 h-10
        rounded-xl
        border border-gray-300/60 dark:border-gray-600/50
        bg-white/70 dark:bg-gray-800/70
        shadow-sm
        hover:shadow-md
        hover:scale-105
        transition-all duration-200 ease-in-out
        backdrop-blur-sm
      "
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <MoonIcon className="w-5 h-5 text-gray-700 dark:text-gray-200" />
      ) : (
        <SunIcon className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
}

export default ThemeToggle;
