const style = {
  backgroundColor: "#FFFFFF",
  color: "#111828",
  fontSize: "18px",
  rounded: "10px",
};

export const dashboardSteps = [
  {
    selector: ".first-step",
    content: () => {
      return (
        <div className="text-center">
          <h1 className="font-bold text-3xl mb-4">
            Welcome to Copywriting Robot 🎉
          </h1>
          <div>Lets give you a quick overview.</div>
        </div>
      );
    },
    style,
  },
  {
    selector: ".overall-tools",
    content: () => {
      return (
        <div className="text-center">
          <h1 className="font-bold text-3xl mb-4">
            🛠️ You can access all your tools here.
          </h1>
        </div>
      );
    },
    style,
  },
  {
    selector: ".singleDescription",
    content: () => {
      return (
        <div>
          <div>
            Click the highlighted icon to generate your first description.
          </div>
        </div>
      );
    },
    style,
  },
];

export const firstDescriptionSteps = [
  {
    selector: ".enter-details",
    content: () => {
      return (
        <div className="text-center">
          <h1 className="text-2xl mb-4 font-bold">Lets generate 🤖 </h1>
          <div className="text-xl ">Enter in your product details.</div>
        </div>
      );
    },
    style,
  },
];
