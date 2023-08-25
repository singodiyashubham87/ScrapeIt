import { useState } from "react";
import { useLocation } from "react-router-dom";
import html2pdf from "html2pdf.js";
import { useAuth0 } from "@auth0/auth0-react";

function Homepage() {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();
  const fetchedData = location.state?.data;
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => setShowModal(false);

  const showModalComponent = () => {
      return ( 
        <>
        <div onClick={closeModal} className="wrapper h-[100vh] w-[100vw] bg-[#CAEDFF] fixed opacity-[90%]"></div>
        <div className="modalContainer fixed bg-black border border-black flex flex-col justify-center items-center px-[2rem] py-[1rem]">
          <h1 className="text-white text-[1.3rem] text-yellow-500">Alert!</h1>
          <p className="text-white m-[1rem] text-[1.3rem]">Login to download PDF</p>
          <div className="buttons w-[100%] flex justify-evenly">
            <button className="login bg-primary px-[1rem] py-[.5rem]">Login</button>
            <button onClick={closeModal} className="close bg-primary px-[1rem] py-[.5rem]">Close</button>
          </div>
        </div>
        </>
      );
  }

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
      <button
        onClick={handleDownloadPDF}
        className="download bg-transparent text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] text-white px-16 hover:bg-white hover:text-black border-2 border-white"
      >
        Download
      </button>
      {showModal && showModalComponent()}
    </div>
  );
}

export default Homepage;
