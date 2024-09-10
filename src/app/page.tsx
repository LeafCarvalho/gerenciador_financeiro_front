"use client";

import { Header } from "./components/header/header";
import { Footer } from "./components/footer/footer";
import { Login } from "./components/login/login";

export default function Home() {


  return (
    <>
      <Header />
        <Login />
      <Footer />
    </>
  );
}
