export default function Button({ children, onClick, className }) {
  return (
    <button
      onClick={onClick}
      className={`${className} rounded-md border-[1px] px-2`}
    >
      {children}
    </button>
  );
}
