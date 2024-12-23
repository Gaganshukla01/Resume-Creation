import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const swiperRef = useRef(null);

    if (!images || images.length === 0) {
        return <div>No images to display</div>;
    }

    // Calculate slidesPerView based on number of images
    const getSlidesPerView = (screenWidth) => {
        if (images.length === 1) return 1;
        if (screenWidth >= 1024) return 4;
        if (screenWidth >= 768) return 1;
        return 1;
    };

    return (
        <section className="portfolio-section container relative">
            {/* Navigation buttons - only show for multiple images */}
            {images.length > 1 && (
                <>
                    <button
                        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg hover:bg-white/30 bg-white/10 backdrop-blur-sm"
                        onClick={() => swiperRef.current?.slidePrev()}
                    >
                        <SlArrowLeft className="w-6 h-6 text-black transform" />
                    </button>
                    <button
                        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 p-3 rounded-full shadow-lg hover:bg-white/30 bg-white/10 backdrop-blur-sm"
                        onClick={() => swiperRef.current?.slideNext()}
                    >
                        <SlArrowRight className="w-6 h-6 text-black transform" />
                    </button>
                </>
            )}

            <Swiper
                onBeforeInit={(swiper) => {
                    swiperRef.current = swiper;
                }}
                slidesPerView={1}
                spaceBetween={20}
                centeredSlides={images.length === 1}
                initialSlide={Math.floor(images.length / 2)}
                breakpoints={{
                    640: {
                        slidesPerView: getSlidesPerView(640),
                        centeredSlides: images.length === 1,
                    },
                    768: {
                        slidesPerView: getSlidesPerView(768),
                        centeredSlides: images.length === 1,
                    },
                    1024: {
                        slidesPerView: getSlidesPerView(1024),
                        spaceBetween: 40,
                        centeredSlides: images.length === 1,
                    },
                }}
                autoplay={images.length > 1 ? {
                    delay: 3000,
                    disableOnInteraction: false,
                } : false}
                freeMode={images.length > 1}
                modules={[Autoplay, FreeMode, Navigation]}
                className={`mySwiper ${images.length === 1 ? 'single-slide-swiper' : ''}`}
                onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
            >
                {images.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className={`portfolio-slide ${images.length === 1 ? 'flex justify-center' : ''}`}
                    >
                        <div className={`portfolio-card ${images.length === 1 ? 'max-w-2xl mx-auto' : ''}`}>
                            <img
                                src={image}
                                alt={`Slide ${index}`}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Slide counter - only show for multiple images */}
            {images.length > 1 && (
                <div className="text-center mt-4">
                    {currentIndex + 1} / {images.length}
                </div>
            )}

            {/* Add this CSS to your stylesheet */}
            <style jsx>{`
                .single-slide-swiper {
                    display: flex;
                    justify-content: center;
                }
                .single-slide-swiper .swiper-wrapper {
                    justify-content: center;
                }
            `}</style>
        </section>
    );
};

export default ImageCarousel;