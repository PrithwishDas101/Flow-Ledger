import { LuMoon, LuSun } from "react-icons/lu";
import { useTheme } from "../../context/ThemeContext.jsx";

const ThemeToggle = ({ className = "" }) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className={`theme-toggle ${className}`}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-pressed={isDark}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
            <span className={`theme-toggle__thumb ${isDark ? "theme-toggle__thumb--dark" : ""}`}>
                {isDark ? <LuMoon aria-hidden="true" /> : <LuSun aria-hidden="true" />}
            </span>
            <span className="sr-only">{isDark ? "Dark mode enabled" : "Light mode enabled"}</span>
        </button>
    );
};

export default ThemeToggle;
