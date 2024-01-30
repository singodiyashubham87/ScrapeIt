import axios from "axios";
import DOMPurify from "dompurify";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import logo from "../assets/images/scraperLogo.png";
import ghlogo from "../assets/images/ghlogo.png";
import ghlogo_white from "../assets/images/ghlogo_white.png";
import data from "../assets/images/data.png";
import search from "../assets/images/search.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
// LandingPage component for handling scraping and authentication
function LandingPage() {
  // Auth0 Hooks
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();

  // State Variables
  const [showModal, setShowModal] = useState(false); //toggle modal
  const [alert, setAlert] = useState(""); //alert heading in modal component
  const [alertError, setAlertError] = useState(""); //alert message in modal component
  const [loader, setLoader] = useState(false); //loader variable
  const [selectedRadioButton, setSelectedRadioButton] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  // Navigation Hook
  const navigateTo = useNavigate();

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
      // loader image will be shown until response is received from API
      setLoader(true);

      // extracting necessary values from elements for api request
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
        const textOnly = radioElements[0].checked ? true : false; // Check if user want text only response or HTML
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

        // we can pass data through this way too but will become undefined on page reload
        // navigateTo = useNavigate();
        // navigateTo("/homepage", { state: { data: res.data.data } });
        sessionStorage.setItem("data", scrapedData);
        setLoader(false); //removing image before leaving page
        navigateTo("homepage");
      }
    }
  };
  // Function to get the current time and determine the greeting
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      return "Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  // Modal and loader handling functions
  const closeModal = () => setShowModal(false);

  // Modal Component/Popup box
  const showModalComponent = () => {
    return (
      <>
        <div
          onClick={closeModal}
          className="wrapper top-[0] bottom-[0] right-[0] left-[0] bg-void fixed opacity-[80%] blur-lg"
        ></div>
        <div className="modalContainer w-[90%] vsm:w-[75%] sm:w-[60%] md:w-[auto] max-w-[43rem] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-red border-2 border-primary flex flex-col justify-center items-center px-[1rem] py-[1rem] md:px-[4rem] md:py-[2rem] xl:px-[5rem] xl:py-[3rem]">
          <h1 className="text-[1.3rem] md:text-[1.7rem] xl:text-[2rem] text-skyblue font-bold">
            {alert || "Alert!"}
          </h1>
          <p className="text-void font-normal text-center m-[1rem] md:m-[1.5rem] xl:m-[2rem] text-[1.2rem] xl:text-[1.7rem] md:text-[1.4rem]">
            {alertError}
          </p>
          <button
            onClick={closeModal}
            className="close md:text-[1.4rem] text-white border border-primary hover:bg-primary hover:text-darkb hover:bg-sec px-[0.5rem] py-[0.25rem] xl:px-[2rem] xl:py-[0.5rem]"
          >
            Close
          </button>
        </div>
      </>
    );
  };

  // loader image component
  const showLoaderImage = () => {
    return (
      <div className="loaderContainer w-[100vw] fixed top-[0] bottom-[0] right-[0] left-[0] bg-[#272829] flex justify-center items-center opacity-[90%]">
        <img
          id="logo"
          src={logo}
          alt="loader"
          className=" border-4 border-white w-[150px] sm:w-[200px] rounded-[50%] animate-spin"
        />
      </div>
    );
  };

  // Returns Loader component if authentication is in progress
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        className={`landingContainer ${
          darkMode ? "bg-pri text-sec" : "bg-skyblue text-void"
        } bg-black w-[100%] h-[100vh] font-primary relative`}
      >
        <div className="content h-[100vh] flex flex-col justify-evenly items-center border-2 border-white-700">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`toggleButton rounded-full bg-darkb hover:bg-white  hover:text-void border-skyblue border-2 fixed top-0 left-0 m-4 flex items-center ${
              darkMode
                ? "dark-mode"
                : "light-mode border-pri hover:bg-[#1D3557]  hover:text-void"
            }`}
          >
            <span
              className={`w-2/4 h-full bg-void rounded-full transition-all ease-in duration-300 absolute ${
                darkMode ? "ml-8" : "ml-0"
              }`}
            />
            <div className="flex px-3 py-2 items-center">
              <FontAwesomeIcon
                icon={faSun}
                size={darkMode ? 20 : 24}
                className={`mr-2 text-black transition ${
                  darkMode ? "opacity-80 text-black" : "opacity-100 text-white"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setDarkMode(false);
                }}
              />
              <FontAwesomeIcon
                icon={faMoon}
                size={darkMode ? 24 : 20}
                className={`ml-2 text-black transition ${
                  darkMode ? "opacity-100 text-black" : "opacity-80"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setDarkMode(true);
                }}
              />
            </div>
          </button>
          <Link
            to={"https://github.com/singodiyashubham87/ScrapeIt"}
            className="absolute top-0 right-0 p-6"
            target="_blank" // open link in a new tab
          >
            <img
              src={darkMode ? ghlogo_white : ghlogo}
              alt="small_github_logo"
              className={`h-10 w-auto ${
                darkMode
                  ? "ghlogo-vsm:h-[2.5rem] ghlogo-vvsm:h-[2rem]"
                  : "ghlogo_white-vsm:h-[2.5rem] ghlogo_white-vvsm:h-[2rem]"
              }`}
            />
          </Link>
          <div className="auth text-center">
            {isAuthenticated && (
              <h1 className="greeting text-[#92eee8] text-center text-[1rem] vvsm:text-[1.5rem] vsm:text-[1.7rem] md:text-[2.5rem] sm:text-[2rem] mb-[1rem]">
                {getGreeting()}, {user.name}!
              </h1>
            )}
            {!isAuthenticated ? (
              <button
                className={`bg-darkb border-skyblue text-white text-[1.5rem] sm:text-[2rem] px-[2rem] sm:px-[4rem] hover:bg-white hover:text-black border-2 ${
                  darkMode ? "border-skyblue" : "border-black"
                }`}
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            ) : (
              <button
                className={`bg-darkb border-skyblue text-white text-[1.5rem] sm:text-[2rem] px-[2rem] sm:px-[4rem] hover:bg-white hover:text-black border-2 border-white-700 ${
                  darkMode ? "border-skyblue" : "border-black"
                }`}
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            )}
          </div>

          <div
            className={`inputBox h-[25%] md:h-[30%] w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[35%] 2xl:w-[30%] flex flex-col items-center justify-between border-2 p-4 ${
              darkMode ? "bg-darkb border-white" : "border-skyblue bg-darkb"
            }`}
          >
            <div className=" bg-cover w-[100%] items-center relative">
              <input
                id="url"
                className="border-none w-[100%] rounded-full text-center text-[1rem] vsm:text-[1.3rem] md:text-[1.5rem] xl:text-[2rem] px-2 py-1 text-black shadow-3xl"
                type="text"
                placeholder="Enter URL to Scrape"
                onKeyDown={(E) => {
                  if (E.key === "Enter") {
                    handleScrapeClick();
                  }
                }}
              />
              <div className=" h-[110%] w-[10%] rounded-full absolute right-0 top-1/2 flex justify-center items-center -translate-y-1/2 shadow-3xl selection:bg-pri selection:text-sec bg-black">
                <img src={search} className="search  h-5 w-auto " />
              </div>
            </div>
            <div className="radioButtons my-2 w-[100%] flex justify-around items-center">
              <div className="textOnlyRadioButton flex justify-center">
                <button
                  className=" bg-transparent px-4  text-void border-skyblue border-opacity-10 border-2 text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] mr-4 md:mr-8 cursor-pointer  hover:border-opacity-100 hover:shadow-inner focus:bg-skyblue focus:bg-opacity-100"
                  type="radio"
                  id="textOnly"
                  name="contentType"
                  value={"true"}
                  onClick={() => setSelectedRadioButton("true")}
                  htmlFor="textOnly"
                >
                  Text Only
                </button>
              </div>
              <div className="htmlRadioButton flex justify-center">
                <button
                  className=" bg-transparent px-4  text-void border-skyblue border-opacity-10 border-2 text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] mr-4 md:mr-8 cursor-pointer  hover:border-opacity-100 hover:shadow-inner focus:bg-skyblue focus:bg-opacity-100"
                  type="radio"
                  id="radioHtml"
                  name="contentType"
                  value={"false"}
                  onClick={() => setSelectedRadioButton("true")}
                  htmlFor="radioHtml"
                >
                  HTML
                </button>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleScrapeClick}
                className="scrape bg-transparent items-center text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] flex justify-between text-sec px-16 hover:bg-pri border-2 border-primary hover:border-skyblue"
              >
                Scrape
                <img src={data} className={`h-7 w-auto }`} />
              </button>
            </div>
            {loader && showLoaderImage()}
            {showModal && showModalComponent()}
          </div>
          <h3
            className={`text-[1rem] vsm:text-[1.2rem] md:text-[2rem] sm:text-[1.5rem] ${
              darkMode ? "text-sec" : "text-void b"
            }`}
          >
            Made with <span className="text-rose-600">&#x2764;</span> by Shubham
            Singodiya
          </h3>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
