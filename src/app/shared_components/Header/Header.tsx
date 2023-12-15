import { CartSVG } from "@/assets/CartSVG";
import Link from "next/link";
import React, { FC } from "react";

import "./Header.css";

const logoUrl = "https://images.secretlab.co/theme/common/logo_secretlab_xmas.svg";

export const Header: FC = () => {
  return (
    <nav className="header-container">
      <div className="content">
        <Link href="/">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="header__logo" src={logoUrl} alt="logo" />
        </Link>
        <Link className="cart" href="/cart">
          <CartSVG amt={5} />
        </Link>
      </div>
    </nav>
  );
};
