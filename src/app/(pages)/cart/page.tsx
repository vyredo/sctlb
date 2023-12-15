"use client";

import { LayoutPage } from "@/app/shared_components/LayoutPage/LayoutPage";
import { useCartStore } from "./cartStore";
import { useProductsStore } from "../(catalog)/productsStore";
import { useMemo, useRef } from "react";
import "./Cart.css";
import { Price } from "./components/Price";
import { Quantity } from "./components/Quantity/Quantity";
import Link from "next/link";

const Cart: React.FC = () => {
  const { products: cartProducts } = useCartStore((state) => state);
  const { products } = useProductsStore((state) => state);

  let totalRealPrice = useRef(0);
  let totalStrikePrice = useRef(0);

  const cartProductsDetails = useMemo(() => {
    // reset total price when cart products change
    totalRealPrice.current = 0;
    totalStrikePrice.current = 0;

    return cartProducts.map((cartProduct) => {
      const product = products.find((product) => product.id === cartProduct.id);
      let realPrice = product?.price ?? 0;
      let strikePrice = "";
      if (product?.discountPercentage) {
        realPrice = product.price - (product.price * product.discountPercentage) / 100;
        strikePrice = product.price.toString();
      }

      totalRealPrice.current += realPrice;
      totalStrikePrice.current += Number(strikePrice);
      return { ...product, quantity: cartProduct.quantity, realPrice: realPrice.toString(), strikePrice };
    });
  }, [cartProducts, products]);
  console.log(cartProductsDetails);
  return (
    <LayoutPage className="cart">
      <h1>Shopping Cart</h1>

      <div className="detail">
        <section className="price-section">
          <div className="label">
            <div>Product</div>
            <div>Price</div>
            <div>Quantity</div>
            <div>Total</div>
          </div>
          <div className="content">
            {cartProductsDetails.map((cartProduct) => {
              return (
                <div className="row" key={cartProduct.title}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img className="img" src={cartProduct.thumbnail} alt="thumbnail" />
                  <div className="row-content">
                    <Link href={`/products/${cartProduct.id}`}>
                      <div className="title">
                        <div>{cartProduct.title}</div>
                        <div>{cartProduct.brand}</div>
                      </div>
                    </Link>
                    <Price className="product-price" realPrice={cartProduct.realPrice} strikePrice={cartProduct.strikePrice} />
                    <Quantity productId={cartProduct.id!} />
                    <Price className="total-price" realPrice={cartProduct.realPrice} strikePrice={cartProduct.strikePrice} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <section className="summary"></section>
      </div>
    </LayoutPage>
  );
};

export default Cart;
