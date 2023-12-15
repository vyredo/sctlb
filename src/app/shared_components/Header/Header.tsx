import Link from "next/link";
import React, { FC } from "react";
import { useCartStore } from "@/app/(pages)/cart/cartStore";
import { CartSVG } from "@/assets/CartSVG/CartSVG";

import "./Header.scss";

const logoUrl = "https://images.secretlab.co/theme/common/logo_secretlab_xmas.svg";

interface Props {
  children?: React.ReactNode;
}

export const Header: FC<Props> = () => {
  const cartQuantity = useCartStore((state) => state.getTotal());

  return (
    <nav className="header-container">
      <div className="content">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="header__logo" src={logoUrl} alt="logo" />
        </Link>
        <Link href="/payments">
          <div>Payments</div>
        </Link>
        <Link className="cart" href="/cart">
          <CartSVG amt={cartQuantity} />
        </Link>
      </div>
    </nav>
  );
};
