import React from "react";
import Header from "@/components/Header/Header";

export default function HomePage() {
  return (
    <>
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        {/* GIF на фоне */}
        <img
          src="/images/jordann.gif"
          alt="Background GIF"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -5,
          }}
        />

        {/* Затемняющий слой */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: -4,
          }}
        />

        {/* Прозрачный хедер */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            background: "rgba(255, 255, 255, 0.37)", // прозрачность 30%
            backdropFilter: "blur(20px)", // лёгкий блюр для стиля
            zIndex: 10,
          }}
        >
          <Header />
        </div>

        {/* Текст по центру */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            zIndex: 2,
          }}
        >
          <h1>Добро пожаловать в каталог товаров</h1>
          <p>Здесь будут товары, фильтры, корзина и многое другое.</p>
        </div>
      </div>
    </>
  );
}
