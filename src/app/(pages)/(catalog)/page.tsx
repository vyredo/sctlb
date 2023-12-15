"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getProducts } from "@/app/REST/Products";
import { LayoutPage } from "@/app/shared_components/LayoutPage/LayoutPage";
import { useProductsStore } from "./productsStore";
import { InfiniteLoader } from "@/app/shared_components/InfiniteLoader/InfiniteLoader";
import "./Home.scss";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(true);

  const { addProducts, products } = useProductsStore((state) => state);
  const skipRef = useRef(0);

  const loadProducts = useCallback(async () => {
    try {
      const response = await getProducts({
        skip: skipRef.current,
        limit: 10,
      });
      addProducts(response.products);
      skipRef.current += 10;
    } catch (error) {
      console.error(error);
    }
  }, [addProducts]);

  useEffect(() => {
    async function onMount() {
      setLoading(true);
      await loadProducts();
      setLoading(false);
    }

    onMount();
  }, [addProducts, loadProducts]);

  return (
    <LayoutPage className="products" loading={loading} seotitle="Catalog">
      <h1>Product Catalog</h1>
      <div className="products-grid">
        {products.map((product, index) => {
          return (
            <Link href={`/products/${product.id}`} key={product.id + product.title + index}>
              <div className="item">
                <div>{product.title}</div>
                <div>{product.price}</div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={product.thumbnail} alt={product.title} width={200} height={200} />
              </div>
            </Link>
          );
        })}
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <InfiniteLoader loadFunction={loadProducts} />
      </div>
    </LayoutPage>
  );
}
