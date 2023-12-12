import Image from "next/image";
import styles from "./page.module.css";
import { useEffect } from "react";
import { getProducts } from "@/app/REST/Products";

export default async function Home() {
  const products = await getProducts();

  return <main></main>;
}
