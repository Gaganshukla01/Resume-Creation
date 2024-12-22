import React, { useEffect, useState } from "react";
import "./Projects.css";
import { Link } from "react-router-dom";
import { getPortfolioByIdOrAll } from "../../services/portfolioService";

const Projects = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  useEffect(() => {
    if (!isDataFetched) {
      fetchPortfolios();
    }
  }, [isDataFetched]);

  const fetchPortfolios = async () => {
    try {
      const portfoliosData = await getPortfolioByIdOrAll();
      setPortfolios(portfoliosData.data);
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };
  function showImage(imageUrl) {
    let url = imageUrl;
    try {
      const imageArray = JSON.parse(imageUrl);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        url = imageArray[0];
      }
    } catch (e) {
      // imageUrl is not a stringified array, use it as is
    }
    return url;
  }

  return (
    <div className="projects-section">
      <div className="projects-heading">
        <h1>Portfolio</h1>
        <p>Discover our creative projects</p>
      </div>

      <div className="projects-grid">
        {portfolios.map((portfolio) => (
          <Link to={`/Details/${portfolio._id}`} key={portfolio._id}>
            <div className="projects-card">
              <div className="projects-card-overlay">
                <h2>{portfolio.title}</h2>
              </div>
              <img src={showImage(portfolio.imageUrl)} alt={portfolio.title} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
