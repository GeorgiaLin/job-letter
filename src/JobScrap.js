import React, { useState, useEffect } from "react";
import cheerio from "cheerio";

function JobScrap() {
  const [jobUrl, setJobUrl] = useState("");
  const [companyIntro, setCompanyIntro] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [roleRequirements, setRoleRequirements] = useState("");

  const handleScrapeClick = () => {
    fetch(jobUrl, {
      mode: "no-cors",
    })
      .then((response) => response.text())
      .then((html) => {
        const $ = cheerio.load(html);

        // Extract company name
        const companyNameText = $(".topcard__org-name-link").text();
        setCompanyIntro(companyNameText);

        // Extract job title
        const jobTitleText = $(".topcard__title").text();
        setRoleDescription(jobTitleText);

        // Extract job description
        const jobDescriptionText = $(".description__text").text();
        setRoleRequirements(roleRequirements);
      })
      .catch((error) => console.log(error));
  };

  const handleInputChange = (event) => {
    setJobUrl(event.target.value);
  };

  return (
    <div>
      <input type="text" value={jobUrl} onChange={handleInputChange} />
      <button onClick={handleScrapeClick}>Scrape Job Post</button>
      <h2>Company Intro:</h2>
      <p>{companyIntro}</p>

      <h2>Role Description:</h2>
      <p>{roleDescription}</p>

      <h2>Role Requirements:</h2>
      <p>{roleRequirements}</p>
    </div>
  );
}

export default JobScrap;
