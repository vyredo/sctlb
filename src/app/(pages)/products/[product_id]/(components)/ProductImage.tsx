"use client";
import { throttle } from "@/app/lib/debounce";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  imagePath: string;
  size: number;
}

export const ProductImage = ({ imagePath, size }: Props) => {
  const imageSectionRef = useRef<HTMLImageElement>(null);

  // throttle for better performance
  const throttleRef = throttle(100, (x: number) => sequence(x));

  const [hoverSection, setHoverSection] = useState("01");

  useEffect(() => {
    if (!imageSectionRef.current) return;
  });

  const sequence = (clientX: number) => {
    if (!imageSectionRef.current) return;
    const { x, width } = imageSectionRef.current.getBoundingClientRect();
    const percent = (clientX - x) / width;
    let section = Math.floor(percent * size + 1);
    if (section <= 0) section = 1; // min should be 1 as the images does not have 00 section

    // section must be double digit
    const sectionString = section.toString().padStart(2, "0");
    setHoverSection(sectionString);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    throttleRef(e.clientX);
  };

  const onTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    throttleRef(e.touches[0].clientX);
  };
  const resetHover = () => setHoverSection("01");

  const url = `${imagePath}_${hoverSection}.jpg`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="image"
      onMouseLeave={resetHover}
      onTouchEnd={resetHover}
      onMouseMove={onMouseMove}
      onTouchMove={onTouchMove}
      ref={imageSectionRef}
      src={url}
      alt={""}
    />
  );
};
