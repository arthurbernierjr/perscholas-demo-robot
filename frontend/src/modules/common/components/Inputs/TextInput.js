const TextInput = ({ label, onChange, value, placeholder }) => {
  return (
    <div className="w-full">
      <h1 className="font-bold text-md block">{label}</h1>
      <input
        type="text"
        id="send-from-email"
        className=" rounded-lg  flex-1 appearance-none w-full py-2 px-4 bg-white text-gray-900 placeholder-gray-400 shadow-sm text-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent block my-2 border border-gray-600"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default TextInput;
