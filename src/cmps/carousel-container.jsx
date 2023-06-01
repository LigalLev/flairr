import { Carousel } from '@trendyol-js/react-carousel';
import React from "react";

function ArrowButton(props) {
  const { direction } = props;

  let arrowToShow;

  if (direction === "right") {
    arrowToShow = (
      <svg
        className="arrow-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8 16"
      >
        <path d="M0.772126 1.19065L0.153407 1.80934C0.00696973 1.95578 0.00696973 2.19322 0.153407 2.33969L5.80025 8L0.153407 13.6603C0.00696973 13.8067 0.00696973 14.0442 0.153407 14.1907L0.772126 14.8094C0.918563 14.9558 1.156 14.9558 1.30247 14.8094L7.84666 8.26519C7.99309 8.11875 7.99309 7.88131 7.84666 7.73484L1.30247 1.19065C1.156 1.04419 0.918563 1.04419 0.772126 1.19065Z" />
      </svg>
    );
  }

  if (direction === "left") {
    arrowToShow = (
      <svg
        className="arrow-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 8 15"
      >
        <path d="M7.2279 0.690653L7.84662 1.30934C7.99306 1.45578 7.99306 1.69322 7.84662 1.83968L2.19978 7.5L7.84662 13.1603C7.99306 13.3067 7.99306 13.5442 7.84662 13.6907L7.2279 14.3094C7.08147 14.4558 6.84403 14.4558 6.69756 14.3094L0.153374 7.76518C0.00693607 7.61875 0.00693607 7.38131 0.153374 7.23484L6.69756 0.690653C6.84403 0.544184 7.08147 0.544184 7.2279 0.690653Z" />
      </svg>
    );
  }

  return (
    <div className="arrow-button">
      <div className="arrow-icon-container">{arrowToShow}</div>
    </div>
  );
}

export function CarouselContainer() {
  const imgUrl = ' https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607730/gigs/heyuacvxghfilhbloyay.jpg'
  const imgUrl1 = ' https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607711/gigs/utfc8fxcnbhrl2jken2o.jpg'
  const imgUrl2 = ' https://res.cloudinary.com/dlhjvt9b4/image/upload/v1685607696/gigs/zvysug7d3tdvekqdfms5.jpg'





  return <Carousel show={1} slide={1} transition={0.5} responsive={true} className='carousel'
    leftArrow={<ArrowButton direction={'left'} />}
    rightArrow={<ArrowButton direction={'right'} />}>
    <img src={imgUrl} alt="" srcset="" />
    <img src={imgUrl1} alt="" srcset="" />
    <img src={imgUrl2} alt="" srcset="" />

  </Carousel>
}