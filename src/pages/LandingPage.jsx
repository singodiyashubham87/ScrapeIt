import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";

function LandingPage() {
  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <>
      <div className="landingContainer bg-black w-[100%] h-[100vh] font-primary">
        <div className="content h-[100vh] flex flex-col justify-evenly items-center border-2 border-white-700">
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
          <div className="inputBox h-[25%] md:h-[30%] w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[35%] flex flex-col items-center justify-between border-2 p-4 border-white">
            <input
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
