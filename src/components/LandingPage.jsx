import { useState } from "react";
import axios from "axios";
import DOMPurify from 'dompurify'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import logo from "../assets/images/scraperLogo.png";

function LandingPage() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();
  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState("");
  const [alertError, setAlertError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigateTo = useNavigate();

  // Click handler for Scrape button
  const handleScrapeClick = async () => {
    setLoader(true);
    const urlElement = document.getElementById("url").value;
    const radioElements = document.getElementsByName("contentType");

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
      const apiKey = import.meta.env.VITE_API_NINJAS_X_API_KEY;
      const textOnly = radioElements[0].checked ? true : false;
      const url = `https://api.api-ninjas.com/v1/webscraper?url=${urlElement}&text_only=${textOnly}`;
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
        if(!textOnly){
          scrapedData = DOMPurify.sanitize(`${scrapedData}`)
        }
        
        // we can pass data through this way too but will become undefined on page reload
        // navigateTo = useNavigate();
        // navigateTo("/homepage", { state: { data: res.data.data } });
        sessionStorage.setItem("data", scrapedData);
      navigateTo("homepage");
    }
  };

  const closeModal = () => setShowModal(false);

  const showModalComponent = () => {
    return (
      <>
        <div
          onClick={closeModal}
          className="wrapper top-[0] bottom-[0] right-[0] left-[0] bg-[#272829] fixed opacity-[90%]"
        ></div>
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
      <div className="landingContainer bg-black w-[100%] h-[100vh] font-primary">
        <div className="content h-[100vh] flex flex-col justify-evenly items-center border-2 border-white-700">
          <div className="auth text-center">
            {isAuthenticated && (
              <h1 className="greeting text-secondary text-[1rem] vvsm:text-[1.5rem] vsm:text-[1.7rem] md:text-[2.5rem] sm:text-[2rem] mb-[1rem]">
                Radhe-Radhe, {user.name}!
              </h1>
            )}
            {!isAuthenticated ? (
              <button
                className="bg-black text-white text-[1.5rem] sm:text-[2rem] px-[2rem] sm:px-[4rem] hover:bg-white hover:text-black border-2 border-white-700"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            ) : (
              <button
                className="bg-black text-white text-[1.5rem] sm:text-[2rem] px-[2rem] sm:px-[4rem] hover:bg-white hover:text-black border-2 border-white-700"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </button>
            )}
          </div>

          <div className="inputBox h-[25%] md:h-[30%] w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[35%] flex flex-col items-center justify-between border-2 p-4 border-white">
            <input
              id="url"
              className="border-none w-[100%] text-center text-[1rem] vsm:text-[1.3rem] md:text-[1.5rem] xl:text-[2rem] px-2 py-1"
              type="text"
              placeholder="Enter URL to Scrape"
            />
            <div className="radioButtons my-2 w-[100%] flex justify-around items-center">
              <div className="textOnlyRadioButton flex justify-center">
                <input
                  className="mr-4 md:mr-8"
                  type="radio"
                  id="textOnly"
                  name="contentType"
                  value={"true"}
                />
                <label
                  className="text-primary text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem]"
                  htmlFor="textOnly"
                >
                  Text Only
                </label>
              </div>
              <div className="htmlRadioButton flex justify-center">
                <input
                  className="mr-4 md:mr-8"
                  type="radio"
                  id="radioHtml"
                  name="contentType"
                  value={"false"}
                />
                <label
                  className="text-primary text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem]"
                  htmlFor="radioHtml"
                >
                  HTML
                </label>
              </div>
            </div>
            <button
              onClick={handleScrapeClick}
              className="bg-transparent text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] text-primary px-16 hover:bg-primary hover:text-black border-2 border-primary"
            >
              Scrape
            </button>
            {loader && showLoaderImage()}
            {showModal && showModalComponent()}
          </div>
          <h3 className="text-secondary text-[1rem] vsm:text-[1.2rem] md:text-[2rem] sm:text-[1.5rem]">
            Made with <span>&#x2764;</span> by Mister Mickey
          </h3>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
