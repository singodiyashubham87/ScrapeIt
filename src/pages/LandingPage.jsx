import { useAuth0 } from "@auth0/auth0-react";

function LandingPage() {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();
  if (isLoading) {
    return <div>Loading ...</div>;
  }
  return (
    <>
      <div className="landingContainer w-[100%] h-[100vh] flex flex-col justify-evenly items-center font-primary border-4 border-blue-700">
        {!isAuthenticated ? (
          <button
            className="bg-black text-white border-4 border-white-700"
            onClick={() => loginWithRedirect()}
          >
            Log In
          </button>
        ) : (
          <button
            className="bg-black text-white"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Log Out
          </button>
        )}
        <div className="inputBox border-4 border-red-800">
          <input
            type="text"
            className="border-4 border-green-800"
            placeholder="Enter URL to Scrape"
          />
          <div className="radioButtons">
            <input
              type="radio"
              id="textOnly"
              name="contentType"
              value={"true"}
            />
            <label htmlFor="textOnly">Text Only</label>
            <input
              type="radio"
              id="radioHtml"
              name="contentType"
              value={"false"}
            />
            <label htmlFor="radioHtml">HTML</label>
          </div>
          <button>Scrape</button>
        </div>
        <h3>Made with <span>&#x2764;</span> by Mister Mickey</h3>
      </div>
    </>
  );
}

export default LandingPage;
