"use client";

import React, { FC, useState } from "react";
import "./ImageCarousel.css";
import { useBlackboxStore } from "../Blackbox/Blackbox";

const ImageCarousel: FC<{ images: any[] }> = ({ images }) => {
  const [current, setCurrent] = useState(0);
  const [hoverIdx, setHoverIdx] = useState(-1);

  const { show } = useBlackboxStore();

  const itemsPerSequence = 3;
  const leftArrowActive = current !== 0,
    rightArrowActive = current !== Math.ceil(images.length / itemsPerSequence) - 1,
    leftArrowClass = `arrow ${leftArrowActive ? "active" : ""}`,
    rightArrowClass = `arrow ${rightArrowActive ? "active" : ""}`;

  const next = () => {
    if (!rightArrowActive) return;
    setCurrent((prev) => (prev + 1) % Math.ceil(images.length / itemsPerSequence));
  };

  const prev = () => {
    if (!leftArrowActive) return;
    setCurrent((prev) => (prev - 1 + Math.ceil(images.length / itemsPerSequence)) % Math.ceil(images.length / itemsPerSequence));
  };

  const onMouseEnter = (idx: number) => {
    setHoverIdx(idx);
  };
  const onMouseLeave = () => {
    setHoverIdx(-1);
  };

  return (
    <section className="carousel-component">
      <span className={leftArrowClass} onClick={prev}>
        {"<"}
      </span>
      <div className="sequence">
        <div className="items" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((image, index) => {
            const className = `item ${hoverIdx === index ? "hover" : ""}`;
            return (
              <div className={className} key={index} onClick={() => show(index)} onMouseEnter={() => onMouseEnter(index)} onMouseLeave={onMouseLeave}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" />
              </div>
            );
          })}
        </div>
      </div>
      <span className={rightArrowClass} onClick={next}>
        {">"}
      </span>
    </section>
  );
};

export default ImageCarousel;
