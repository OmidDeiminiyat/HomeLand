import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from './Header.module.scss';

function Slideshow() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch("https://api.mediehuset.net/homelands/images")
      .then((response) => response.json())
      .then((data) => setImages(data.items)) 
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  
  return (
    <div className={style.slideshow}>
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img src={image.image[0]} alt={image.title} className={style.slideImage} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Slideshow;
