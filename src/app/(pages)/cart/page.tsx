"use client";

import { LayoutPage } from "@/app/shared_components/LayoutPage/LayoutPage";
import { useCartStore } from "./cartStore";
import { useProductsStore } from "../(catalog)/productsStore";
import { useEffect, useMemo, useRef, useState } from "react";
import { Price } from "./components/Price";
import { Quantity } from "./components/Quantity/Quantity";
import Link from "next/link";
import { getProductById } from "@/app/REST/Products";
import { Button } from "@/app/shared_components/Button/Button";
import { createCheckout } from "@/app/REST/Checkout";
import { PaymentMetadata } from "@/app/Type/PaymentInfo";
import { useRouter } from "next/navigation";

import "./Cart.scss";

const Cart: React.FC = () => {
  const { products: cartProducts, clear: clearCart } = useCartStore((state) => state);
  const { products, addProduct } = useProductsStore((state) => state);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    // check if products has been loaded, if not fetch
    async function checkProducts() {
      setLoading(true);

      //  use await to simplify the fetch, optimize later using Promise.allSettled
      for (const cartProduct of cartProducts) {
        if (!products.find((product) => product.id === cartProduct.id)) {
          try {
            setLoading(true);
            const p = await getProductById(cartProduct.id.toString());
            if (p) {
              addProduct(p);
            }
            setLoading(false);
          } catch (error) {}
        }
      }
      setLoading(false);
    }

    checkProducts();
  }, [addProduct, cartProducts, products]);

  let totalRealPrice = useRef(0);
  let totalStrikePrice = useRef(0);

  const cartProductsDetails = useMemo(() => {
    // reset total price when cart products change
    totalRealPrice.current = 0;
    totalStrikePrice.current = 0;

    return cartProducts.map((cartProduct) => {
      const product = products.find((product) => product.id === cartProduct.id);
      let realPrice = product?.price ?? 0;
      let strikePrice = 0;
      if (product?.discountPercentage) {
        realPrice = product.price - (product.price * product.discountPercentage) / 100;
        strikePrice = product.price;
      }
      const sumRealPrice = realPrice * cartProduct.quantity;
      const sumStrikePrice = strikePrice * cartProduct.quantity;
      totalRealPrice.current += sumRealPrice;
      totalStrikePrice.current += sumStrikePrice;

      return {
        ...product,
        quantity: cartProduct.quantity,
        realPrice: realPrice.toString(),
        strikePrice: strikePrice.toString(),
        sumRealPrice: sumRealPrice.toString(),
        sumStrikePrice: sumStrikePrice.toString(),
      };
    });
  }, [cartProducts, products]);

  if (cartProducts.length === 0 && !loading) {
    return (
      <LayoutPage className="cart" loading={loading} seotitle="Cart">
        <h1>Shopping Cart</h1>
        <div className="empty-cart font-title">Your cart is empty</div>
      </LayoutPage>
    );
  }

  const onClickPaynow = async () => {
    const req: PaymentMetadata[] = cartProductsDetails.map((cartProduct) => {
      return {
        title: cartProduct.title as string,
        id: cartProduct.id!,
        quantity: cartProduct.quantity,
        pricePerItem: Number(cartProduct.realPrice),
      };
    });
    const resp = await createCheckout({
      items: req,
      total: totalRealPrice.current,
    });

    // save to local storage
    let paymentListStr = localStorage.getItem("paymentList");
    let paymentList = [];
    if (!paymentListStr) {
      localStorage.setItem("paymentList", JSON.stringify([]));
    } else {
      paymentList = JSON.parse(paymentListStr);
    }
    paymentList.push(resp);
    // filter empty object
    paymentList = paymentList.filter((p: any) => Object.keys(p).length !== 0);
    localStorage.setItem("paymentList", JSON.stringify(paymentList));
    clearCart();
    router.push("/payments");
    return true;
  };

  return (
    <LayoutPage className="cart" loading={loading} seotitle="Cart">
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
                      <div className="title font-title">
                        <div>{cartProduct.title}</div>
                        <div>{cartProduct.brand}</div>
                      </div>
                    </Link>
                    <Price className="product-price" realPrice={cartProduct.realPrice} strikePrice={cartProduct.strikePrice} />
                    <Quantity productId={cartProduct.id!} />
                    <Price className="total-price" realPrice={cartProduct.sumRealPrice} strikePrice={cartProduct.sumStrikePrice.toString()} />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        <h2 className="font-title">Cart Summary</h2>
        <section className="summary">
          <div>Total Amount</div>
          <Price className="total-price" realPrice={totalRealPrice.current.toString()} />
          <ul style={{ margin: "10px 0" }}>
            <li>All Payment will use default test card</li>
            <li>There is no need to fill user credit card here</li>
          </ul>
          <Button async onClick={onClickPaynow} type="primary">
            Pay Now
          </Button>
        </section>
      </div>
    </LayoutPage>
  );
};

export default Cart;
