import { useTheme } from "../contexts/ThemeProvider";

export default function Button({ children, onClick, className, disabled }) {
  const { theme } = useTheme();

  return (
    <button
      onClick={onClick}
      className={`${className} ${
        disabled ? "opacity-50" : ""
      } rounded-md border border-sanJuanLight px-2 ${
        theme === "dark" ? "active:bg-sanJuanDark/25" : "active:bg-gray-100"
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
