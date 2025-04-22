const GreenButton = ({
  children,
  onClick,
  bgColor,
  textColor,
  bgHoverColor,
  extraStyle,
}) => {
  const style = `py-2 px-2 flex justify-center items-center  ${bgColor} hover:${bgHoverColor} focus:ring-${bgColor} focus:ring-offset-${bgColor} text-md text-${textColor} w-full transition ease-in duration-200 text-center font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ${extraStyle} shadow-lg`;

  return (
    <button type="button" className={style} onClick={onClick}>
      {children}
    </button>
  );
};

export default GreenButton;
