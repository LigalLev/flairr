import React from "react";
import Slider from "react-slick";

const slides = ['1', '2', '3', '4', '5']
export function PopularServicesCarousel() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        // slidesToScroll: 5,
        // responsive: [
        //     {
        //         breakpoint: 1235,
        //         settings: {
        //             slidesToShow: 4,
        //             slidesToScroll: 4,
        //             infinite: true,
        //             dots: false
        //         }
        //     },
        //     {
        //         breakpoint: 1060,
        //         settings: {
        //             slidesToShow: 3,
        //             slidesToScroll: 3,
        //         }
        //     },
        //     {
        //         breakpoint: 800,
        //         settings: {
        //             slidesToShow: 2,
        //             slidesToScroll: 2
        //         },
        //         breakpoint: 600,
        //         settings: {
        //             slidesToShow: 1,
        //             slidesToScroll: 1
        //         }
        //     }
        // ],
        // className

    }

    return (
        <section className="popular-services-slider-container">

            <Slider {...settings}>
                {slides.map((slide, idx) =>
                    <CustomSlide key={idx} slide={slide} />

                )}


            </Slider>
        </section>
    )
}

export function CustomSlide({ slide }) {

    return (
        <div className="custom-slide" style={{backgroundColor: 'red', border: '2px solid black'}}>
            <h3>{slide}</h3>
        </div>
    )
}