import React, { FC } from "react";
import "./Star.css";

export const Stars: FC<{ rating: number }> = ({ rating }) => {
  const percentage = rating * 20;
  return (
    <section className="stars-component">
      <div className="empty-stars"></div>
      <div className="full-stars" style={{ width: `${percentage}%` }}></div>
    </section>
  );
};
