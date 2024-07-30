import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import watch from "../../assets/watch.jpg";
import watch1 from "../../assets/watch1.jpg";
import dealspy1 from "../../assets/dealspy1.png"
import dealspy2 from "../../assets/dealspy2.png"
import dealspy3 from "../../assets/dealspy3.png"
import dealspy4 from "../../assets/dealspy4.png"
import dealspy5 from "../../assets/dealspy5.png"

const Herocaroucel = () => {
  const heroimgs = [
    {
      imgurl: dealspy1,
      alt: "Mac Book",
    },
    {
      imgurl: dealspy2,
      alt: "Mobile",
    },
    {
      imgurl: dealspy3,
      alt: "Sniker",
    },
    {
      imgurl: dealspy4,
      alt: "Shirt",
    },
    {
      imgurl: dealspy5,
      alt: "smart watch",
    },
  ];
  return (
    <div className="hero-carousel ">
      <Carousel
      showThumbs={false}
      autoPlay
      infiniteLoop
      interval={2000}
      showArrows={false}
      showStatus={false}
     className="carousel  rounded-10"
      >
        {heroimgs.map((img, index) => (
          <div key={index} className="w-[100%] h-[100%]">
            <img className="w-[100px] h-[400px] object-contain" src={img.imgurl} />
          </div>
        ))}
      </Carousel>

    </div>
  );
};

export default Herocaroucel;
