import { useTheme } from "../contexts/ThemeProvider";

export default function AuthContainer({ children }) {
  const { theme } = useTheme();

  return (
    <section
      className={`${
        theme === "dark" ? "bg-blob-dark text-white" : "bg-blob"
      } grid h-[100vh] w-[100vw] place-items-center font-karla `}
    >
      <section
        className={`${
          theme === "dark" ? "bg-mineShaftLight" : "bg-white"
        } flex min-w-[30vw] flex-col items-center gap-4 rounded-md px-12 py-8 shadow-one md:w-fit`}
      >
        {children}
      </section>
    </section>
  );
}
