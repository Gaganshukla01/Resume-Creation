import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import {SlArrowLeft, SlArrowRight} from "react-icons/sl";

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);

    if (!images || images.length === 0) {
        return <div>No images to display</div>;
    }

    return (
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
                slidesPerView={1}
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
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                freeMode={true}
                modules={[Autoplay, FreeMode, Navigation]}
                className="mySwiper"
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index} className="portfolio-slide">
                        <div className="portfolio-card">
                            <img src={image} alt={`Slide ${index}`}/>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Optional: Slide counter */}
            <div className="text-center mt-4">
                {currentIndex + 1} / {images.length}
            </div>
        </section>
    );
};

export default ImageCarousel;