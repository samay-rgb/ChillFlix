import React, { useState, useEffect } from "react";
import useInterval from "../hooks/useInterval";
import classes from "./carousel.module.css";
import Image, { StaticImageData } from "next/image";
type CarouselProps = {
  images: StaticImageData[];
  interval?: number;
};
const Carousel = ({ images, interval = 5000 }: CarouselProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const previousImage = () => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  };

  const nextImage = () => {
    setCurrentImageIndex(
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
    );
  };

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  //   }, interval);
  //   return () => clearInterval(intervalId);
  // }, [currentImageIndex, interval, images]);4
  useInterval(
    () => {
      setCurrentImageIndex(
        currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1
      );
    },
    interval,
    [currentImageIndex, images]
  );

  return (
    <div className="carousel">
      {/* <button className={classes.carouselButton} onClick={previousImage}>
        Previous
      </button> */}
      <Image
        className={classes.carouselImage}
        src={images[currentImageIndex].src}
        alt={`Image ${currentImageIndex + 1}`}
        width={images[currentImageIndex].width}
        height={images[currentImageIndex].height}
        layout="responsive"
        objectFit="cover"
      />
      {/* <button className={classes.carouselButton} onClick={nextImage}>
        Next
      </button> */}
    </div>
  );
};

export default Carousel;
