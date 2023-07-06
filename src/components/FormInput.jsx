export default function FormInput({
  onChange,
  type = "text",
  placeholder,
  name,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className="h-8 rounded-md border px-2 text-sm outline-none placeholder:text-sm"
      onChange={onChange}
      autoComplete="off"
      required
    />
  );
}
