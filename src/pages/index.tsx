import Image from "next/image";
import { Inter } from "next/font/google";
import CheckoutLayout from "@/layouts/checkout-layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <CheckoutLayout glassType={"COOLING_GLASS"}/>
  );
}
