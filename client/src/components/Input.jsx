const Input = ({ placeholder, name, type, value, onChange }) => {
  return (
    <input
      className="my-2 w-full !rounded-sm p-2 outline-none bg-transparent text-white !border-none text-sm white-glassmorphism"
      placeholder={placeholder}
      type={type}
      step="0.0001"
      name={name}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
