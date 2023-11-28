import html2pdf from "html2pdf.js";
import { Link, useNavigate } from "react-router-dom";
import ghlogo from "../assets/images/ghlogo.png";

function Homepage() {
  const navigateTo = useNavigate();
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

  return (
    <div className="homepageContainer font-primary h-[100vh] w-[100%] bg-black flex flex-col items-center justify-evenly">
      <Link
        to={"https://github.com/singodiyashubham87/ScrapeIt"}
        className="absolute top-0 right-0 p-6"
      >
        <img src={ghlogo} alt="small_github_logo" className="h-14"/>
      </Link>
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
    </div>
  );
}

export default Homepage;
