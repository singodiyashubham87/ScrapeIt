import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import Loader from "./Loader"


function LandingPage() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } =
    useAuth0();

  // Click handler for Scrape button 
  const handleScrapeClick = async () => {
    const urlElement = document.getElementById("url").value;
    const radioElements = document.getElementsByName("contentType");


    if (urlElement === "") alert("Please enter a URL");

    else {
      const apiKey = import.meta.env.VITE_API_NINJAS_X_API_KEY;
      const textOnly = radioElements[0].checked ? true : false;
      const url = `https://api.api-ninjas.com/v1/webscraper?url=${urlElement}&text_only=${textOnly}`;
      const res = await axios
        .get(url, {
          headers: { "X-Api-Key": apiKey },
          text_only: textOnly,
        })
        .catch((error) => console.warn(error));

        // we can pass data through this way too but will become undefined on page reload 
        // navigateTo = useNavigate();
        // navigateTo("/homepage", { state: { data: res.data.data } }); 
        sessionStorage.setItem("data", res.data.data);
    }
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
            <Link
              onClick={handleScrapeClick}
              to="/homepage"
              className="bg-transparent text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] text-primary px-16 hover:bg-primary hover:text-black border-2 border-primary"
            >
              Scrape
            </Link>
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
