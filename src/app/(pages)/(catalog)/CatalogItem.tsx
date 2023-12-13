import React, { useEffect, useRef } from "react";

export const CatalogItem = ({ item }: { item: any }) => {
  const imageSectionRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageSectionRef.current) return;
  });

  return (
    <div className="Catalog">
      <div className="image">
        <div>
          <span>NEW</span>
          <span>SALE</span>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img ref={imageSectionRef} src={item.image} alt={item.name} />
      </div>
      <div>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
      </div>
    </div>
  );
};
