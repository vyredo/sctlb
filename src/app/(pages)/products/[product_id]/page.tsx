"use client";

import React, { useCallback, useEffect, useState } from "react";
import { getProductById } from "@/app/REST/Products";
import { Product } from "@/app/model/Product";
import { Header } from "@/app/shared_components/Header/Header";
import { ProductImage } from "./(components)/ProductImage";
import ImageCarousel from "./(components)/ImageCarousell/ImageCarousel";
import { LayoutPage } from "@/app/shared_components/LayoutPage/LayoutPage";
import { Title } from "./(components)/Title";
import { useRouter } from "next/navigation";
import { Blackbox } from "./(components)/Blackbox/Blackbox";
import { useProductStore } from "./productStore";
import { Button } from "@/app/shared_components/Button/Button";
import { Device, useDeviceStore } from "@/app/shared_components/LayoutPage/DeviceStore";

import "./product.css";
import { sleep } from "@/lib/sleep";
import { useCartStore } from "../../cart/cartStore";
import { Spinner } from "@/assets/Spinner/Spinner";
import { useProductsStore } from "../../(catalog)/productsStore";
import { useShallow } from "zustand/react/shallow";

interface Props {
  params: {
    product_id: string;
  };
}

export default function Product({ params: { product_id } }: Props) {
  const router = useRouter();
  if (!product_id) router.push("/");

  const [loading, setLoading] = useState(true);
  const { device } = useDeviceStore((state) => state);
  const { product, viewProductById, unviewProduct, incNumberProduct, decNumberProduct, numberOfProductToCart } = useProductStore((state) => state);

  // update products store without rerendering this component
  const { addProduct } = useProductsStore(useShallow((state) => state));
  if (product) addProduct(product);

  useEffect(() => {
    async function getproduct() {
      setLoading(true);
      await sleep(1000);
      try {
        const product = await getProductById(product_id);
        if (!product) throw new Error("Product not found");
        viewProductById(product);
      } catch (error) {}
      setLoading(false);
    }
    getproduct();

    return () => {
      unviewProduct?.();
    };
  }, [product_id, router, unviewProduct, viewProductById]);

  const { add } = useCartStore((state) => state);
  const handleAddToCart = useCallback(async () => {
    // simulate server call
    await sleep(1000);
    const id = Number(product_id);
    if (!id) return;
    add(id);
  }, [add, product_id]);

  if (loading) {
    return (
      <LayoutPage className="product" loading={loading}>
        <></>
      </LayoutPage>
    );
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const imagePath = product.imagesTurntable?.[0]?.replace("_01.jpg", "");
  const images = [product.imagesTurntable?.[0], ...product.images];

  let realPrice = product.price;
  let strikePrice = "";
  if (product.discountPercentage) {
    realPrice = product.price - (product.price * product.discountPercentage) / 100;
    strikePrice = product.price.toString();
  }

  return (
    <LayoutPage className="product">
      <Blackbox images={images} />

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
        <Button async className="addcart" onClick={handleAddToCart}>
          <div>Add to Cart</div>
        </Button>
        <hr />
        <div className="description">
          <div className="label">Features</div>
          <ul>
            {product.description.split(", ").map((desc: string) => {
              return <li key={desc}>{desc}</li>;
            })}
          </ul>
        </div>
      </section>
    </LayoutPage>
  );
}
