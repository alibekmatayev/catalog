"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./ProductCard.module.scss";

const { card, imageWrapper, cardText, visible } = styles;

export default function ProductCard({ name, price, image, onClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`${card} ${isVisible ? visible : ""}`}
      onClick={onClick}
      style={{ cursor: "pointer" }}
    >
      <div className={imageWrapper}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className={cardText}>
        <h4>{name}</h4>
        <p>{price}₸</p>
      </div>
    </div>
  );
}
