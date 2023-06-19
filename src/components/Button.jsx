export default function Button({ children, onClick, className, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        disabled ? "opacity-50" : ""
      } rounded-md border-[1px] px-2`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
