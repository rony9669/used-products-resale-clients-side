import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

const CarouselHome = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: 450 }}
          src="https://i.postimg.cc/J02T60K3/3.jpg"
          alt="First slide"
        />
        {/* <Carousel.Caption className="text-danger font-weight-bold">
          <h3>Count The Memories not The Calories </h3>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 "
          src="https://i.postimg.cc/g0sHtr2w/1.webp"
          style={{ height: 450 }}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 font-weight-bold"
          src="https://i.postimg.cc/hPMP6F75/2.jpg"
          style={{ height: 450 }}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.postimg.cc/WbDTWDTh/6.jpg"
          style={{ height: 450 }}
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.postimg.cc/nrFYVbVP/4.webp"
          style={{ height: 450 }}
          alt="Fifth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.postimg.cc/FKbLYW65/7.jpg"
          style={{ height: 450 }}
          alt="Sixth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.postimg.cc/y6D0PPg9/5.jpg"
          style={{ height: 450 }}
          alt="Seventh slide"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselHome;
