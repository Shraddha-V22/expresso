export default function Button({ children, onClick, className, disabled }) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${
        disabled ? "opacity-50" : ""
      } rounded-md border border-sanJuanLight px-2 active:bg-gray-100`}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
