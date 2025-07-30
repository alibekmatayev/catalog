import React from "react";
import Header from "@/components/Header/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <div className="center-container">
        <h1>Добро пожаловать в каталог товаров</h1>
        <p>Здесь будут товары, фильтры, корзина и многое другое.</p>
      </div>
    </div>
  );
}
