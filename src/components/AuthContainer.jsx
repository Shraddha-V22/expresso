import { useTheme } from "../contexts/ThemeProvider";

export default function AuthContainer({ children }) {
  const { theme } = useTheme();

  return (
    <section
      className={`${
        theme === "dark"
          ? "bg-[url('https://raw.githubusercontent.com/Shraddha-V22/images-for-projects/main/social-media-bg/bg-blobs-dark.webp')] text-white"
          : "bg-[url('https://raw.githubusercontent.com/Shraddha-V22/images-for-projects/main/social-media-bg/bg-blobs.webp')]"
      } grid h-[100vh] w-[100vw] place-items-center bg-cover font-karla`}
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
