import React, {useState} from "react";
import {useKeenSlider} from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

function ThumbnailPlugin(mainRef) {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active");
            });
        }

        function addActive(idx) {
            slider.slides[idx].classList.add("active");
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx);
                });
            });
        }

        slider.on("created", () => {
            if (!mainRef.current) return;
            addActive(slider.track.details.rel);
            addClickEvents();
            mainRef.current.on("animationStarted", (main) => {
                removeActive();
                const next = main.animator.targetIdx || 0;
                addActive(main.track.absToRel(next));
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next));
            });
        });
    };
}


export function BigCarousel(props) {
    const imgUrls = props.imgUrls
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider({
        loop:true,
        initial: 0,

        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel);
        },
        created() {
            setLoaded(true);
        }
    });
    const [thumbnailRef] = useKeenSlider(
        {
            initial: 0,
            slides: {
                perView: 7,
                spacing: 8
            }
        },
        [ThumbnailPlugin(instanceRef)]
    );
    return (
        <>
            <div className="navigation-wrapper">
                <div ref={sliderRef} className="keen-slider">
                    {imgUrls.map((url) =>
                        <div className="keen-slider__slide">
                            <img src={url}/>
                        </div>
                    )}

                </div>
                {loaded && instanceRef.current && (
                    <>
                        <Arrow
                            direction={"left"}
                            left
                            onClick={(e) =>
                                e.stopPropagation() || instanceRef.current?.prev()
                            }
                        />
                        <Arrow
                            direction={"right"}
                            onClick={(e) => {
                                console.log(currentSlide)
                                return e.stopPropagation() || instanceRef.current?.next();
                            }}  
                        />
                    </>
                )}
            </div>
     
            <div ref={thumbnailRef} className="keen-slider thumbnail">
                {imgUrls.map((url) =>
                    <div className="keen-slider__slide">
                        <img src={url}/>
                    </div>
                )}
            </div>
        </>
    );
}

function Arrow(props) {
    const {direction} = props
    let arrowToShow;
    let className;
    if (direction === "right") {
        arrowToShow = <svg width="8" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z"/>
        </svg>
        className = "details-arrow arrow arrow--right"
    }
    if (direction === "left") {
        arrowToShow = <svg width="8" height="15" viewBox="0 0 8 15" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.2279 0.690653L7.84662 1.30934C7.99306 1.45578 7.99306 1.69322 7.84662 1.83968L2.19978 7.5L7.84662 13.1603C7.99306 13.3067 7.99306 13.5442 7.84662 13.6907L7.2279 14.3094C7.08147 14.4558 6.84403 14.4558 6.69756 14.3094L0.153374 7.76518C0.00693607 7.61875 0.00693607 7.38131 0.153374 7.23484L6.69756 0.690653C6.84403 0.544184 7.08147 0.544184 7.2279 0.690653Z"/>
        </svg>
        className = "details-arrow arrow arrow--left"
    }
    const disabeld = props.disabled ? " arrow--disabled" : "";

    return (
        <div onClick={props.onClick} className={className}>
            {arrowToShow}

        </div>
    )

    return (
        <svg
            onClick={props.onClick}
            className={`arrow ${
                props.left ? "arrow--left" : "arrow--right"
            } ${disabeld}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
        >
            {props.left && (
                <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"/>
            )}
            {!props.left && (
                <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/>
            )}
        </svg>
    );
}