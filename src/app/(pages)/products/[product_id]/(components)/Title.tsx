import { capitalize } from "@/app/lib/capitalize";
import { Stars } from "./Star/Star";
import React, { FC } from "react";
import { Product } from "@/app/ZustandStore/model/Product";

interface Props {
  product: Product;
}

export const Title: FC<Props> = ({ product }) => {
  return (
    <>
      <div className="title">{capitalize(product.title)}</div>
      <div className="rating">
        <Stars rating={product.rating} />
        <div className="review-wording">{product.rating}/5 rating</div>
      </div>
    </>
  );
};
