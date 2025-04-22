import { useEffect } from "react";
import ReactGA from "react-ga4";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./modules/Dashboard";
import Homepage from "./modules/Homepage";
import Auth from "./modules/Auth";

ReactGA.initialize("GA Code");

function App() {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
