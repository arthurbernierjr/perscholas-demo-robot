const CardBox = ({ children }) => {
  return (
    <div className="block p-4 mx-4 mt-5 overflow-hidden bg-white shadow-lg rounded-xl">
      {children}
    </div>
  );
};

export default CardBox;
