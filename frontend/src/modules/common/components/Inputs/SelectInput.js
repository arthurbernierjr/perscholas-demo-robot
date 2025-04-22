const SelectInput = ({ title, optionArr, onChange, value }) => {
  const options = optionArr.map(({ name, value }) => {
    const optionName = `${name}`;
    return (
      <option className="block w-full" value={value} key={value}>
        {optionName}
      </option>
    );
  });
  return (
    <div className="py-2 w-full ">
      <label className="text-gray-900 font-bold " htmlFor="animals">
        {title}
        <select
          id="animals"
          className="flex w-full text-gray-700 py-2 px-2 border border-gray-700 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500  mt-1 "
          onChange={onChange}
          value={value}
        >
          {options}
        </select>
      </label>
    </div>
  );
};

export default SelectInput;
