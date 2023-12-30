import html2pdf from "html2pdf.js";
import { Link, useNavigate } from "react-router-dom";
import ghlogo from "../assets/images/ghlogo.png";

// Homepage component for displaying scraped data

function Homepage() {
  // React Router hook for navigation
  const navigateTo = useNavigate();

   // Retrieve scraped data from session storage
  const fetchedData = sessionStorage.getItem("data");

  // we can get the data passed from navigateTo()'s state param like this
  // const location = useLocation();
  // const fetchedData = location.state?.data;

  // Click handler for ReScrape button
  const handleReScrape = () => navigateTo("/");

  // Click handler for Download button
  const handleDownloadPDF = () => {
    // Create PDF using html2pdf library
    const worker = html2pdf();
    const opt = {
      margin: 5,
      filename: "Scraped Data.pdf",
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };
    worker.from(fetchedData, "string").to("pdf").set(opt).save();
  };

    // Render the Homepage component
  return (
    <div className="homepageContainer font-primary h-[100vh] w-[100%] bg-black flex flex-col items-center justify-evenly relative">
      <Link
        to={"https://github.com/singodiyashubham87/ScrapeIt"}
        className="absolute top-0 right-0 p-6"
        target="_blank"  // open link in a new tab
      >
        <img src={ghlogo} alt="small_github_logo" className="h-10"/>
      </Link>

      {/* Display the scraped data */}
      <span className="bg-white text-[2rem] px-[2rem]">Scrapped Data:</span>
      <p className="scrapedData bg-primary max-w-[90%] vsm:w-[80%] max-h-[70%] overflow-y-auto text-white md:text-[1.5rem] xl:text-[2rem] vvsm:text-[1rem] py-[1rem] px-[4rem] vvsm:px-[2rem] border-4 border-white">
        {" "}
        <code>{fetchedData}</code>
      </p>

       {/* Buttons for Download and ReScrape actions */}
      <div className="buttons flex flex-col text-center w-[90%] vsm:w-[80%]  md:flex-row justify-evenly items-center">
        {/* Download button */}
        <button
          onClick={handleDownloadPDF}
          className="download bg-transparent text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] text-white px-16 hover:bg-white hover:text-black border-2 border-white mb-[1rem] md:mb-[0]"
        >
          Download
        </button>

         {/* ReScrape button */}
        <button
          onClick={handleReScrape}
          className="download bg-transparent text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] text-white px-16 hover:bg-white hover:text-black border-2 border-white"
        >
          ReScrape
        </button>
      </div>
    </div>
  );
}

// Export the Homepage component as the default export
export default Homepage;
