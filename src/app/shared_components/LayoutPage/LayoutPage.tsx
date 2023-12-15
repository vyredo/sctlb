"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Device, useDeviceStore } from "./DeviceStore";
import { Header } from "../Header/Header";
import "./LayoutPage.css";
import { Spinner } from "@/assets/Spinner/Spinner";

interface LayoutPageProps {
  children: ReactNode;
  className: string;
  loading?: boolean;
}

/**
 * LayoutPage is a component that wraps the entire page.
 * It is used to provide a consistent logic across all pages, i.e does the page for desktop, mobile, tablet
 */

const MAX_WIDTH = {
  MOBILE: 430,
  TABLET: 768,
};

export const LayoutPage: React.FC<LayoutPageProps> = ({ children, className, loading }) => {
  const { device, setDevice } = useDeviceStore((state) => state);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > MAX_WIDTH.TABLET) {
        setDevice(Device.Desktop);
      } else if (window.innerWidth > MAX_WIDTH.MOBILE) {
        setDevice(Device.Tablet);
      } else {
        setDevice(Device.Mobile);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setDevice]);

  const _className = `${className} ${device}`;

  return (
    <main className={_className}>
      <Header />
      {loading && (
        <div className="loading-container">
          <Spinner />
        </div>
      )}
      {!loading && children}
    </main>
  );
};
