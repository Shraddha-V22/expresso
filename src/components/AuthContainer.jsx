import { useTheme } from "../contexts/ThemeProvider";

export default function AuthContainer({ children }) {
  const { theme } = useTheme();

  return (
    <section
      className={`${
        theme === "dark" ? "bg-sanJuanDark text-white" : ""
      } grid h-[100vh] w-[100vw] place-items-center font-karla`}
    >
      <section
        className={`${
          theme === "dark" ? "bg-sanJuan" : "border"
        } flex max-w-[300px] flex-col items-center gap-4 rounded-md px-12 py-8 md:w-fit`}
      >
        {children}
      </section>
    </section>
  );
}
