import "./Spinner.css";

const Spinner = ({ text }) => {
  return (
    <div className="overlay" id="loading">
      <div className="overlay__inner">
        <div className="overlay__content text-center">
          <span className="spinner"></span>
          <div className="text-gray-900 my-5 font-bold text-center max-w-xs">
            {text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
