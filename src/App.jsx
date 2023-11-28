import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Homepage from "./components/Homepage";

// The main App component

function App() {
  return (
     // Use the BrowserRouter to enable React Router functionality
    <Router>
       {/* Define the routes for different paths */}
      <Routes>
        {/* Route for the landing page */}
        <Route path="/" exact element={<LandingPage/>} />
        {/* Route for the homepage */}
        <Route path="/homepage" element={<Homepage/>} />
      </Routes>
    </Router>
  );
}
// Export the App component as the default export
export default App;
