import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
      <Script src="https://aframe.io/releases/1.5.0/aframe.min.js" strategy="beforeInteractive" />
      <Script src="https://unpkg.com/mind-ar@latest/dist/mindar-face-aframe.prod.js" strategy="beforeInteractive" />
      <Script src="https://raw.githubusercontent.com/mayognaise/aframe-screenshot-component/master/dist/aframe-screenshot-component.min.js"/>
      </Head>
   
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
