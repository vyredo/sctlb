import React from "react";

export const Price: React.FC<{ className: string; realPrice: string; strikePrice?: string }> = ({ realPrice, strikePrice, className }) => {
  const realPriceNum = Number(realPrice).toFixed(2);
  const strikePriceNum = Number(strikePrice).toFixed(2);

  return (
    <div className={"price-container" + " " + className}>
      <div className="price">${realPriceNum}</div>
      {strikePrice && <div className="strike-price">${strikePriceNum}</div>}
    </div>
  );
};
