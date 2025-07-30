"use client";

import styles from "./Header.module.scss";
import Link from "next/link";
import { ShoppingBasket, Search, Menu, X } from "lucide-react";
import { useState } from "react";

const {
  header,
  logo,
  nav,
  cart,
  menuButton,
  mobileMenu,
  mobileNavOpen,
  rightGroup,
} = styles;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={header}>
      <Link href="/" className={logo}>
        CATALOG
      </Link>
      <nav className={nav}>
        <Link href="/">Главная</Link>
        <Link href="/products">Продукты</Link>
        <Link href="/reviews">Отзывы</Link>
        <Link href="/contacts">Контакты</Link>
      </nav>

      <div className={rightGroup}>
        <Search strokeWidth={0.75} />
        <Link className={cart} href="/cart">
          <ShoppingBasket
            style={{ cursor: "pointer" }}
            size={24}
            strokeWidth={0.75}
          />
        </Link>

        <button
          className={menuButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X strokeWidth={1} /> : <Menu strokeWidth={1} />}
        </button>
      </div>

      <div className={`${mobileMenu} ${isMenuOpen ? mobileNavOpen : ""}`}>
        <Link href="/" onClick={() => setIsMenuOpen(false)}>
          Главная
        </Link>
        <Link href="/products" onClick={() => setIsMenuOpen(false)}>
          Продукты
        </Link>
        <Link href="/reviews" onClick={() => setIsMenuOpen(false)}>
          Отзывы
        </Link>
        <Link href="/contacts" onClick={() => setIsMenuOpen(false)}>
          Контакты
        </Link>
      </div>
    </header>
  );
}
