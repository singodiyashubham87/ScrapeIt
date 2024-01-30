import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Homepage from "./pages/Homepage";
import Errorpage from "./pages/Errorpage";

// The main App component

function App() {
  return (
    // Use the BrowserRouter to enable React Router functionality
    <Router>
      {/* Define the routes for different paths */}
      <Routes>
        {/* Route for the landing page */}
        <Route path="/" exact element={<LandingPage />} />
        {/* Route for the homepage */}
        <Route path="/homepage" element={<Homepage />} />
        {/* Route for undefined page*/}
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </Router>
  );
}
// Export the App component as the default export
export default App;
