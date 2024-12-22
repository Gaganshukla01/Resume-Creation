import React, {useEffect, useRef, useState} from "react";
import ContactSection from "../../Home/Contact/Contact";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link, useParams } from "react-router-dom";
import {
  getPortfolioById,
  getPortfolioByListNameLogo,
  // createContact,
} from "../../services/portfolioService";
import ImageCarousel from "../../Components/common/ImageCarousel";

// import Contact from "../Contact/Contact";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import ReactPlayer from "react-player";
import "./Details.css";

// import Master from "../../Assets/Details/Master.jpg";

// import required modules
import { Autoplay, FreeMode } from "swiper/modules";
import {SlArrowLeft, SlArrowRight} from "react-icons/sl";


const Details = () => {
  const { projectId } = useParams();

  const [portfolios, setPortfolios] = useState({});
  const [isDataFetched, setIsDataFetched] = useState(false);
  const [videoUrls, setVideoUrls] = useState([]);
  const swiperRef = useRef(null);

  const [portfolioList, setPortfolioList] = useState([]);

  useEffect(() => {
    if (!isDataFetched) {
      fetchPortfolios();
      fetchPortfolioList();
    }
  }, [isDataFetched]);

  const fetchPortfolios = async () => {
    try {
      const portfoliosData = await getPortfolioById(projectId);

      const urls = [];
      for (let i = 1; i <= 18; i++) {
        const key = `workUrl_${i}`;
        if (portfoliosData.data[key]) {
          urls.push(portfoliosData.data[key]);
        }
      }
      setVideoUrls(urls);

      setPortfolios(portfoliosData.data);
      setIsDataFetched(true);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };

  const fetchPortfolioList = async () => {
    try {
      const data = await getPortfolioByListNameLogo();
      setPortfolioList(data.data);
      setIsDataFetched(true);
      console.log(data.data, "getPortfolioByListNameLogo");
    } catch (error) {
      console.error("Error fetching portfolios:", error);
    }
  };
  function showImage(imageUrl) {
    let url = imageUrl;
    try {
      const imageArray = JSON.parse(imageUrl);
      if (Array.isArray(imageArray) && imageArray.length > 0) {
        url = imageArray;
      }
    } catch (e) {
      // imageUrl is not a stringified array, use it as is
    }
    return url;
  }

  // const videoId = "tgbNymZ7vqY"; // Replace with desired video ID

  return (
    <>
      {/* Master Image */}
      <div className="master">
        {/* <img src={portfolios.masterImg} alt="" srcset="" /> */}
        <ReactPlayer
          url={portfolios.videoUrl}
          playing={true}
          muted={true}
          className="goodimg"
          width="100%"
          height="100%"
          controls={false}
          loop
        />
      </div>

      <div className="details-container">
        {/* Head */}

        <div className="details-heading">
          <h1>{portfolios.title}</h1>
          <p>{portfolios.desc}</p>
        </div>

        {/*  */}

        {/* Good Images */}

        <div className="goodimg">
          {
            typeof showImage(portfolios.imageUrl) !== 'string' ? (
                <ImageCarousel images={showImage(portfolios.imageUrl)}/>
            ) : (
                <img src={showImage(portfolios.imageUrl)} alt="" srcset=""/>
            )
          }
        </div>

        {/* Swiper */}
        <section className="portfolio-section container relative">
          {/* Navigation buttons */}
          <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg hover:bg-white/30 bg-white/10 backdrop-blur-sm"
              onClick={() => swiperRef.current?.slidePrev()}
          >
            <SlArrowLeft className="w-6 h-6 text-black transform "/>
          </button>
          <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg hover:bg-white/30 bg-white/10 backdrop-blur-sm"
              onClick={() => swiperRef.current?.slideNext()}
          >
            <SlArrowRight className="w-6 h-6 text-black transform "/>
          </button>
          <Swiper
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={1} /* Show 1 slide on small screens */
              spaceBetween={20}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 1,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 40,
                },
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay, FreeMode]}
              className="mySwiper"
          >
            {videoUrls.map((url, index) => (
                <SwiperSlide key={index} className="testimonial-slide">
                  <div className="testimonial-card">

                    <ReactPlayer
                        className="testimonial-photo"
                        url={url}
                        playing={true} // Autoplay
                        muted={true} // Muted
                        controls={false} // Hide YouTube controls
                        loop // Loop video
                        width="100%" // Full width of container
                        height="100%" // Full height of container
                        playsinline={true} // Allow the video to play inline on mobile
                        config={{
                          youtube: {
                            playerVars: {
                              modestbranding: 1, // Hides YouTube logo
                              showinfo: 0, // Hides video title
                              rel: 0, // Prevents showing related videos
                              controls: 0, // Hides player controls
                            },
                          },
                        }}
                    />

                  </div>
                </SwiperSlide>
            ))}
          </Swiper>
        </section>

          <ContactSection/>
      </div>
    </>
);
};

export default Details;
