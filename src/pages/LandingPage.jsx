import axios from "axios";
import DOMPurify from "dompurify";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import logo from "../assets/images/scraperLogo.png";
import { ThemeProvider, useTheme } from "../components/ThemeToggle";
import ghlogopng from "../assets/images/github-logo.png";
import ghlogo from "../assets/images/ghlogo.png";

// LandingPage component for handling scraping and authentication
function LandingPage() {
  // Auth0 Hooks
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();

  // State Variables
  const [showModal, setShowModal] = useState(false); // Toggle modal
  const [alert, setAlert] = useState(""); // Alert heading in modal component
  const [alertError, setAlertError] = useState(""); // Alert message in modal component
  const [loader, setLoader] = useState(false); // Loader variable
  const [selectedRadioButton, setSelectedRadioButton] = useState(false);

  // Navigation Hook
  const navigateTo = useNavigate();
  const { isDarkMode, toggleThemeMode } = useTheme();

  // Click handler for Scrape button
  const handleScrapeClick = async () => {
    // Validation and error handling
    if (!selectedRadioButton) {
      setAlertError("Please select either Text Only or HTML");
      setShowModal(true);
    } else if (!isAuthenticated) {
      setAlertError("Login to continue");
      setShowModal(true);
    } else {
      // Loader image will be shown until a response is received from the API
      setLoader(true);

      // Extracting necessary values from elements for API request
      const urlElement = document.getElementById("url").value;
      const radioElements = document.getElementsByName("contentType");

      // Validating URL
      const urlRegex = /^(http[s]?:\/\/)(www\.)?[^\s$.?#].[^\s]*$/i;
      if (urlElement === "") {
        setLoader(false);
        setAlertError("Please enter a URL");
        setShowModal(true);
      } else if (!urlRegex.test(urlElement)) {
        setLoader(false);
        setAlertError("Please enter a valid URL");
        setShowModal(true);
      } else {
        // API request configuration
        const apiKey = import.meta.env.VITE_API_NINJAS_X_API_KEY;
        const textOnly = radioElements[0].checked ? true : false; // Check if the user wants a text-only response or HTML
        const url = `https://api.api-ninjas.com/v1/webscraper?url=${urlElement}&text_only=${textOnly}`;

        // API request using axios
        const res = await axios
          .get(url, {
            headers: { "X-Api-Key": apiKey },
            text_only: textOnly,
          })
          .catch((error) => {
            setLoader(false);
            console.warn(error);
            setAlert("API Error!");
            setAlertError("Please try again later");
            setShowModal(true);
          });

        let scrapedData = res.data.data;

        // Sanitizing the received HTML to prevent XSS vulnerabilities
        if (!textOnly) {
          scrapedData = DOMPurify.sanitize(`${scrapedData}`);
        }

        // Storing data in session storage (can become undefined on page reload)
        sessionStorage.setItem("data", scrapedData);
        setLoader(false); // Removing the image before leaving the page
        navigateTo("homepage");
      }
    }
  };

  // Function to get the current time and determine the greeting
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Good Afternoon';
    } else {
      return 'Good Evening';
    }
  };

  // Modal and loader handling functions
  const closeModal = () => setShowModal(false);

  // Modal Component/Popup box
  const showModalComponent = () => {
    return (
      <>
        {/* Modal overlay */}
        <div
          onClick={closeModal}
          className="wrapper top-[0] bottom-[0] right-[0] left-[0] bg-[#272829] fixed opacity-[90%]"
        ></div>

        {/* Modal content */}
        <div className="modalContainer w-[90%] vsm:w-[75%] sm:w-[60%] md:w-[auto] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-black border-2 border-primary flex flex-col justify-center items-center px-[1rem] py-[1rem] md:px-[4rem] md:py-[2rem] xl:px-[5rem] xl:py-[3rem] ">
          <h1 className="text-white text-[1.3rem] md:text-[1.7rem] xl:text-[2rem] text-yellow-500">
            {alert || "Alert!"}
          </h1>
          <p className="text-white text-center m-[1rem] md:m-[1.5rem] xl:m-[2rem] text-[1.3rem] xl:text-[2rem] md:text-[1.7rem]">
            {alertError}
          </p>
          <button
            onClick={closeModal}
            className="close md:text-[1.5rem] text-white border border-primary hover:bg-primary hover:text-black px-[1rem] py-[.5rem] xl:px-[3rem] xl:py-[1rem]"
          >
            Close
          </button>
        </div>
      </>
    );
  };

  // Loader image component
  const showLoaderImage = () => {
    return (
      <div className="loaderContainer w-[100vw] fixed top-[0] bottom-[0] right-[0] left-[0] bg-[#272829] flex justify-center items-center opacity-[90%]">
        <img
          id="logo"
          src={logo}
          alt="loader"
          className="border-4 border-white w-[150px] sm:w-[200px] rounded-[50%] animate-spin"
        />
      </div>
    );
  };

  // Returns Loader component if authentication is in progress
  if (isLoading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <>
      <div className={`landingContainer font-primary relative ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <div className={`content h-[100vh] flex flex-col justify-evenly items-center border-2 border-white-700 ${isDarkMode ? 'bg-black text-white' : 'light-mode'}`}>
            {/* GitHub logo link */}
            <Link
              to={"https://github.com/singodiyashubham87/ScrapeIt"}
              className="absolute top-0 right-0 p-6"
            >
              <img src={isDarkMode ? ghlogo : ghlogopng} alt="small_github_logo" className="h-10 ghlogo-vsm:h-[2.5rem] ghlogo-vvsm:h-[2rem]" />
            </Link>

            {/* Authentication section */}
            <div className="auth text-center">
              {isAuthenticated && (
                <h1 className="greeting text-secondary text-[1rem] vvsm:text-[1.5rem] vsm:text-[1.7rem] md:text-[2.5rem] sm:text-[2rem] mb-[1rem]">
                  {getGreeting()}, {user.name}!
                </h1>
              )}
              {!isAuthenticated ? (
                <button
                  className={`bg-${isDarkMode ? 'black' : 'grey-300'} text-${isDarkMode ? 'white' : 'black'} text-[1.5rem] sm:text-[2rem] px-[2rem] sm:px-[4rem] hover:bg-${isDarkMode ? 'white' : 'grey-400'} hover:text-${isDarkMode ? 'black' : 'white'} border-2 ${isDarkMode ? 'border-white-700' : 'border-gray-700'}`}
                  onClick={() => loginWithRedirect()}
                >
                  Log In
                </button>
              ) : (
                <button
                  className={`bg-${isDarkMode ? 'black' : 'grey-300'} text-${isDarkMode ? 'white' : 'black'} text-[1.5rem] sm:text-[2rem] px-[2rem] sm:px-[4rem] hover:bg-${isDarkMode ? 'grey-400' : 'black'} hover:text-${isDarkMode ? 'black' : 'white'} border-2 ${isDarkMode ? 'border-white-700' : 'border-gray-700'}`}
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Log Out
                </button>
              )}
            </div>

            {/* Theme toggle button */}
            <button
  id="theme-toggle"
  data-tooltip-target="tooltip-toggle"
  type="button"
  className={`text-gray-500 inline-flex items-center justify-center dark:text-gray-400 bg-gray-100 w-10 h-10 dark:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 fixed top-0 left-0 m-4 ${isDarkMode ? 'dark' : ''}`}
  onClick={toggleThemeMode}
>
  {/* Dark mode icon */}
  <svg
    id="theme-toggle-dark-icon"
    className={`w-4 h-4 ${isDarkMode ? '' : 'hidden'}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 18 20"
  >
    <path d="M17.8 13.75a1 1 0 0 0-.859-.5A7.488 7.488 0 0 1 10.52 2a1 1 0 0 0 0-.969A1.035 1.035 0 0 0 9.687.5h-.113a9.5 9.5 0 1 0 8.222 14.247 1 1 0 0 0 .004-.997Z"></path>
  </svg>
  {/* Light mode icon */}
  <svg
    id="theme-toggle-light-icon"
    className={`w-4 h-4 ${isDarkMode ? 'hidden' : ''}`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-11a1 1 0 0 0 1-1V1a1 1 0 0 0-2 0v2a1 1 0 0 0 1 1Zm0 12a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1ZM4.343 5.757a1 1 0 0 0 1.414-1.414L4.343 2.929a1 1 0 0 0-1.414 1.414l1.414 1.414Zm11.314 8.486a1 1 0 0 0-1.414 1.414l1.414 1.414a1 1 0 0 0 1.414-1.414l-1.414-1.414ZM4 10a1 1 0 0 0-1-1H1a1 1 0 0 0 0 2h2a1 1 0 0 0 1-1Zm15-1h-2a1 1 0 1 0 0 2h2a1 1 0 0 0 0-2ZM4.343 14.243l-1.414 1.414a1 1 0 1 0 1.414 1.414l1.414-1.414a1 1 0 0 0-1.414-1.414ZM14.95 6.05a1 1 0 0 0 .707-.293l1.414-1.414a1 1 0 1 0-1.414-1.414l-1.414 1.414a1 1 0 0 0 .707 1.707Z"></path>
  </svg>
</button>


            {/* Input box and Scrape button */}
            <div className={`inputBox h-[25%] md:h-[30%] w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[35%] 2xl:w-[30%] flex flex-col items-center justify-between border-2 p-4 ${isDarkMode ? 'border-white' : 'border-black'}`}>
            <input
              id="url"
              className={`border-none w-full text-center text-[1rem] vsm:text-[1.3rem] md:text-[1.5rem] xl:text-[2rem] px-2 py-1 ${isDarkMode ? 'bg-white text-black placeholder-gray-600' : 'bg-white text-black placeholder-gray-600 '}`}
              type="text"
              placeholder="Enter URL to Scrape"
            />

            <div className="radioButtons my-2 w-[100%] flex justify-around items-center">
              <div className="textOnlyRadioButton flex justify-center">
                <input
                  className="mr-4 md:mr-8 cursor-pointer"
                  type="radio"
                  id="textOnly"
                  name="contentType"
                  value={"true"}
                  onChange={() => setSelectedRadioButton("true")}
                />
                <label
  className={`${isDarkMode ? 'text-primary' : 'text-dark'} text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem]`}
  htmlFor="textOnly"
>
  Text Only
</label>

              </div>
              <div className="htmlRadioButton flex justify-center">
                <input
                  className="mr-4 md:mr-8 cursor-pointer"
                  type="radio"
                  id="radioHtml"
                  name="contentType"
                  value={"false"}
                  onChange={() => setSelectedRadioButton("true")}
                />
               <label
  className={`${isDarkMode ? 'text-primary' : 'text-dark'} text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem]`}
  htmlFor="radioHtml"
>
  HTML
</label>

              </div>
            </div>
            <button
              onClick={handleScrapeClick}
              className={`bg-transparent text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem]  px-16 hover:bg-primary hover:text-black border-2 border-primary ${isDarkMode ? 'text-white' : 'text-black'}`}
            >
              Scrape
            </button>
            {loader && showLoaderImage()}
            {showModal && showModalComponent()}
          </div>
          <h3 className={`text-[1rem] vsm:text-[1.2rem] md:text-[2rem] sm:text-[1.5rem] ${isDarkMode ? 'text-secondary' : 'text-black'}`}>
  Made with {isDarkMode ? <span>&#x2764;</span> : <span style={{ color: 'red' }}>&#x2764;</span>} by Shubham Singodiya
</h3>

        </div>
      </div>
    </>
    </ThemeProvider>
  );
}


export default LandingPage;
