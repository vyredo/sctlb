"use client";

import React, { useEffect } from "react";
import { getProductById } from "@/app/REST/Products";
import { Product } from "@/app/ZustandStore/model/Product";
import { Header } from "@/app/components/Header";
import { ProductImage } from "./(components)/ProductImage";
import ImageCarousel from "./(components)/ImageCarousell/ImageCarousell";
import { LayoutPage } from "@/app/components/LayoutPage/LayoutPage";
import { Title } from "./(components)/Title";
import { Device, useDeviceStore } from "@/app/ZustandStore/DeviceStore";
import { useRouter } from "next/navigation";
import { Blackbox } from "./(components)/Blackbox/Blackbox";
import { create } from "zustand";
import { useProductStore } from "./productStore";

import "./product.css";
import { Button } from "@/app/components/Button/Button";

interface Props {
  params: {
    product_id: string;
  };
}

export default function Product({ params: { product_id } }: Props) {
  const router = useRouter();
  if (!product_id) router.push("/");

  const { device } = useDeviceStore((state) => state);
  const { product, viewProductById, unviewProduct, incNumberProduct, decNumberProduct, numberOfProductToCart } = useProductStore((state) => state);

  useEffect(() => {
    async function getproduct() {
      try {
        const product = await getProductById(product_id);
        if (!product) throw new Error("Product not found");
        viewProductById(product);
      } catch (error) {}
    }
    getproduct();

    return () => {
      unviewProduct?.();
    };
  }, [product_id, router, unviewProduct, viewProductById]);

  if (!product) {
    // todo: loading animation
    return <div>Loading...</div>;
  }

  const imagePath = product.imageSequence?.[0]?.replace("_01.jpg", "");
  const images = [product.imageSequence?.[0], ...product.images];

  console.log("numberOfProductToCart", numberOfProductToCart);
  let realPrice = product.price;
  let strikePrice = "";
  if (product.discountPercentage) {
    realPrice = product.price - (product.price * product.discountPercentage) / 100;
    strikePrice = product.price.toString();
  }
  return (
    <LayoutPage className="product">
      <Blackbox images={images} />
      <Header />

      <section className="left">
        {device === Device.Mobile && <Title product={product} />}
        <ProductImage imagePath={imagePath} size={12} />
        <ImageCarousel images={images} />
      </section>
      <section className="right">
        {device !== Device.Mobile && <Title product={product} />}
        <div className="selling-price">
          <div>Selling Price</div> <span className="real-price">${realPrice.toFixed(2)}</span>
          {product.discountPercentage && <span className="strike-price">${strikePrice}</span>}
        </div>
        <div className="quantity">
          <div>Quantity</div>
          <div className="control">
            <div className="btn" onClick={decNumberProduct}>
              -
            </div>
            <div className="amt">{numberOfProductToCart}</div>
            <div className="btn" onClick={() => incNumberProduct(product.stock)}>
              +
            </div>
          </div>
        </div>
        <Button async className="addcart">
          <div>Add to Cart</div>
        </Button>
        <hr />
        <div className="description">
          <div className="label">Features</div>
          <ul>
            {product.description.split(", ").map((desc) => {
              return <li key={desc}>{desc}</li>;
            })}
          </ul>
        </div>
      </section>
    </LayoutPage>
  );
}
