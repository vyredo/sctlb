"use client";

import { useEffect } from "react";
import { getProductById } from "@/app/REST/Products";
import { Product } from "@/app/ZustandStore/model/Product";
import { Header } from "@/app/components/Header";
import { ProductImage } from "./(components)/ProductImage";
import ImageCarousel from "./(components)/ImageCarousell/ImageCarousell";
import { LayoutPage } from "@/app/components/LayoutPage";
import { Title } from "./(components)/Title";
import { useProductStore } from "@/app/ZustandStore/ProductStore";
import { Device, useDeviceStore } from "@/app/ZustandStore/DeviceStore";
import { useRouter } from "next/navigation";

import "./products.css";
import { Blackbox } from "./(components)/Blackbox/Blackbox";

interface Props {
  params: {
    // todo: might consider to have slug instead of product_id
    product_id: string; // the product in dummyjson has id and title, will pick id for now
  };
}

export default function Product({ params: { product_id } }: Props) {
  const router = useRouter();
  if (!product_id) router.push("/");

  const { device } = useDeviceStore((state) => state);
  const { product, viewProductById, unviewProduct } = useProductStore((state) => state);

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
  console.log(product);
  const imagePath = product.imageSequence?.[0]?.replace("_01.jpg", "");
  const images = [product.imageSequence?.[0], ...product.images];
  return (
    <LayoutPage className="products">
      <Blackbox images={images} />
      <Header />

      <div>
        <div className="left">
          {device === Device.Mobile && <Title product={product} />}
          <ProductImage imagePath={imagePath} size={12} />
          <ImageCarousel images={images} />
        </div>
        <div className="right">{device !== Device.Mobile && <Title product={product} />}</div>
      </div>
    </LayoutPage>
  );
}
