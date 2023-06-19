export default function AuthContainer({ children }) {
  return (
    <section className="grid h-[100vh] w-[100vw] place-items-center">
      <section className="flex max-w-[300px] flex-col items-center gap-4 rounded-md border px-12 py-8 md:w-fit">
        {children}
      </section>
    </section>
  );
}
