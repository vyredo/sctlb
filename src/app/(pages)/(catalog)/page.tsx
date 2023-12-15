"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { getProducts } from "@/app/REST/Products";
import { LayoutPage } from "@/app/shared_components/LayoutPage/LayoutPage";
import { products } from "@/mock/products";
import { useProductsStore } from "./productsStore";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const { addProducts, products } = useProductsStore((state) => state);

  useEffect(() => {
    async function onMount() {
      setLoading(true);
      try {
        const response = await getProducts();
        addProducts(response.products);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    }

    onMount();
  }, [addProducts]);

  return (
    <LayoutPage className="products" loading={loading}>
      <div>hello wolr</div>
      <div className="products-grid">
        {products.map((product) => {
          return (
            <div className="item" key={product.id}>
              <div>{product.name}</div>
              <div>{product.price}</div>
              <Image src={product.image} alt={product.name} width={200} height={200} />
            </div>
          );
        })}
      </div>
    </LayoutPage>
  );
}
