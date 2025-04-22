const Card = ({ children, title, explanation }) => {
  return (
    <div className="w-full px-4 my-4 lg:my-2  block overflow-hidden">
      <h1 className="text-gray-700 font-bold text-3xl mb-2 text-center">
        {title}
      </h1>
      <p className="text text-gray-400 text-center  mb-6">{explanation}</p>
      {children}
    </div>
  );
};

export default Card;
