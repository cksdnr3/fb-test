import type { AppProps } from "next/app";
import FirebaseApp from "../components/firebase-app";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <FirebaseApp />
      <Component {...pageProps} />
    </>
  );
}
