import React, { useEffect, useRef, useState } from "react";

const chairImage = "https://images.secretlab.co/turntable/tr:n-w_1500/R22PU-Stealth_01.jpg";

export const CatalogItem = ({ item }: { item: any }) => {
  const imageSectionRef = useRef<HTMLImageElement>(null);

  // there are 12 sections
  const hoverSection = useState(0);

  useEffect(() => {
    if (!imageSectionRef.current) return;
  });

  const onHover = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    if (!imageSectionRef.current) return;
    const width = imageSectionRef.current.clientWidth;
  };

  return (
    <div className="Catalog">
      <div className="image">
        <div>
          <span>NEW</span>
          <span>SALE</span>
        </div>

        <img onMouseEnter={} ref={imageSectionRef} src={item.image} alt={item.name} />
      </div>
      <div>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>
    </div>
  );
};
