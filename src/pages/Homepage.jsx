function Homepage(){
    return (
        <div className="homepageContainer font-primary h-[100vh] w-[100%] bg-black flex flex-col items-center justify-evenly">
            <span className="bg-white text-[2rem] px-[2rem]">Scrapped Data:</span>
            <p className="scrapedData bg-primary max-w-[90%] vsm:w-[80%] max-h-[70%] overflow-y-auto text-black md:text-[1.5rem] xl:text-[2rem] vvsm:text-[1rem] py-[1rem] px-[4rem] vvsm:px-[2rem] border-4 border-white"> <code>{`{
  "data": "<!doctype html>
<html>
<head>
    <title>Example Domain</title>

    <m        font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
        
    }
    div {
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #fdfdff;
        border-radius: 0.5em;
        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;
            width: auto;
        }
    }
    </style>    
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>
        width: 600px;
        margin: 5em auto;
        padding: 2em;
        background-color: #fdfdff;
        border-radius: 0.5em;
        box-shadow: 2px 3px 7px 2px rgba(0,0,0,0.02);
    }
    a:link, a:visited {
        color: #38488f;
        text-decoration: none;
    }
    @media (max-width: 700px) {
        div {
            margin: 0 auto;
            width: auto;
        }
    }
    </style>    
</head>

<body>
<div>
    <h1>Example Domain</h1>
    <p>This domain is for use in illustrative examples in documents. You may use this
    domain in literature without prior coordination or asking for permission.</p>
    <p><a href="https://www.iana.org/domains/example">More information...</a></p>
</div>
</body>
</html>
"
}`}</code></p>
            <button className="download bg-transparent text-[1.2rem] vsm:text-[1.5rem] md:text-[2rem] text-white px-16 hover:bg-white hover:text-black border-2 border-white">Download</button>
        </div>
    );
}

export default Homepage;