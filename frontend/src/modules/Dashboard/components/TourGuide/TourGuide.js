import Tour from "reactour";

const TourGuide = ({ showTour, setShowTour, steps, showClose }) => {
  const handleClose = () => {
    return setShowTour(false);
  };

  return (
    <Tour
      steps={steps}
      isOpen={showTour}
      onRequestClose={handleClose}
      accentColor="#3a82f6"
      className=""
      showNavigationNumber={false}
      showCloseButton={false}
      showNumber={false}
      showNavigation={false}
      lastStepNextButton={
        showClose ? (
          <div className="bg-gray-600 text-white py-1 px-2 rounded text-sm">
            Close
          </div>
        ) : (
          false
        )
      }
      rounded={10}
    />
  );
};

export default TourGuide;
