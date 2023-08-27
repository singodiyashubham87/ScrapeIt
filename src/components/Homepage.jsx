import { useState } from "react";
import html2pdf from "html2pdf.js";
import { useAuth0 } from "@auth0/auth0-react";
import Loader from "./Loader";
import { useNavigate } from "react-router";


function Homepage() {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const navigateTo = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const fetchedData = sessionStorage.getItem('data');
  
  // we can get the data passed from navigateTo()'s state param like this 
  // const location = useLocation();
  // const fetchedData = location.state?.data;

  if (isLoading) return <Loader />;

  const closeModal = () => setShowModal(false);

  const showModalComponent = () => {
    return (
      <>
        <div
          onClick={closeModal}
          className="wrapper h-[100vh] w-[100vw] bg-[#272829] fixed opacity-[90%]"
        ></div>
        <div className="modalContainer fixed bg-black border-2 border-primary flex flex-col justify-center items-center px-[2rem] py-[1rem] md:px-[4rem] md:py-[2rem] xl:px-[5rem] xl:py-[3rem]">
          <h1 className="text-white text-[1.3rem] md:text-[1.7rem] xl:text-[2rem] text-yellow-500">
            Alert!
          </h1>
          <p className="text-white m-[1rem] md:m-[1.5rem] xl:m-[2rem] text-[1.3rem] xl:text-[2rem] md:text-[1.7rem]">
            Login to download PDF
          </p>
          <div className="buttons w-[100%] flex justify-evenly">
            <button
              onClick={() =>
                loginWithRedirect({
                  redirectUri: "https://scrape-it-seven.vercel.app/homepage",
                })
              }
              className="login text-white border border-primary hover:bg-primary hover:text-black md:text-[1.5rem] px-[1rem] py-[.5rem] xl:px-[3rem] xl:py-[1rem]"
            >
              Login
            </button>
            <button
              onClick={closeModal}
              className="close md:text-[1.5rem] text-white border border-primary hover:bg-primary hover:text-black px-[1rem] py-[.5rem] xl:px-[3rem] xl:py-[1rem]"
            >
              Close
            </button>
          </div>
        </div>
      </>
    );
  };

  // Click handler for ReScrape button 
  const handleReScrape = () => navigateTo("/");

  // Click handler for Download button 
  const handleDownloadPDF = () => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      const worker = html2pdf();
      const opt = {
        margin: 5,
        filename: "Scraped Data.pdf",
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };
      worker.from(fetchedData, "string").to("pdf").set(opt).save();
    }
  };

  return (
    <div className="homepageContainer font-primary h-[100vh] w-[100%] bg-black flex flex-col items-center justify-evenly">
      <span className="bg-white text-[2rem] px-[2rem]">Scrapped Data:</span>
      <p className="scrapedData bg-primary max-w-[90%] vsm:w-[80%] max-h-[70%] overflow-y-auto text-black md:text-[1.5rem] xl:text-[2rem] vvsm:text-[1rem] py-[1rem] px-[4rem] vvsm:px-[2rem] border-4 border-white">
        {" "}
        <code>{fetchedData}</code>
      </p>
      <div className="buttons flex flex-col text-center w-[90%] vsm:w-[80%]  md:flex-row justify-evenly items-center">
      <button
        onClick={handleDownloadPDF}
        className="download bg-transparent text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] text-white px-16 hover:bg-white hover:text-black border-2 border-white mb-[1rem] md:mb-[0]"
        >
        Download
      </button>
      <button
        onClick={handleReScrape}
        className="download bg-transparent text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] text-white px-16 hover:bg-white hover:text-black border-2 border-white"
      >
        ReScrape
      </button>
        </div>

      {showModal && showModalComponent()}
    </div>
  );
}

export default Homepage;
