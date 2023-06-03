import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from "react-responsive-carousel";
import { GigIndex } from "../pages/gig-index";
import { utilService } from "../services/util.service";

function ArrowButton(props) {
  const { direction } = props
  let arrowToShow;
  if (direction === "right") {
    arrowToShow = <svg width="8" height="16" viewBox="0 0 8 16" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
    </svg>
  }
  if (direction === "left") {
    arrowToShow = <svg width="8" height="15" viewBox="0 0 8 15" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.2279 0.690653L7.84662 1.30934C7.99306 1.45578 7.99306 1.69322 7.84662 1.83968L2.19978 7.5L7.84662 13.1603C7.99306 13.3067 7.99306 13.5442 7.84662 13.6907L7.2279 14.3094C7.08147 14.4558 6.84403 14.4558 6.69756 14.3094L0.153374 7.76518C0.00693607 7.61875 0.00693607 7.38131 0.153374 7.23484L6.69756 0.690653C6.84403 0.544184 7.08147 0.544184 7.2279 0.690653Z" />
    </svg>
  }
  return (
    <div>
      <div className='my-arrow'>
        {arrowToShow}
      </div>
    </div>
  )
}
export function CarouselContainer({gig}) {
  const urls = gig.imgUrl
  const [isHovered, setIsHovered] = useState(false)
  let nextClassName;
  let prevClassName;
  if (isHovered) {
    nextClassName = "my-control my-control-next"
    prevClassName = "my-control my-control-prev"
  }
  else {
    nextClassName = "my-control hide-to-right"
    prevClassName = "my-control hide-to-left"
  }
  return <div onMouseOver={() => setIsHovered(true)} onMouseOut={() => setIsHovered(false)}>
    <Carousel
      infiniteLoop={true}
      showIndicators={true}
      showThumbs={false}
      showStatus={false}
      renderArrowNext={(clickHandler, hasNext) => {

        return <div className={nextClassName}>
          {hasNext && <div onClick={clickHandler}>
            <ArrowButton direction={'right'} show={isHovered} />
          </div>}
        </div>;
      }
      }
      renderArrowPrev={(clickHandler, hasPrev) =>
        <div className={prevClassName}>
          {hasPrev && <div onClick={clickHandler}>
            <ArrowButton direction={'left'} show={isHovered} />
          </div>}
        </div>
      }
    >
      {urls.map((url) => {
        return <div key={gig._id} className="carousel-img-container">
          < img src={utilService.resizeImgUrl(url)} className="carousel-img"/>
        </div>

      })}
    </Carousel>
  </div>
}
