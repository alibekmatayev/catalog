"use client";

import Image from "next/image";
import styles from "./ProductModal.module.scss";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const { name, price, image, colors = [] } = product;
  const sizes = Array.from({ length: 11 }, (_, i) => 36 + i);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => Math.max(1, q - 1));

  const totalPrice = price * quantity;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Выберите размер перед добавлением в корзину!");
      return;
    }

    addToCart({
      ...product,
      quantity,
      size: selectedSize,
      totalPrice,
    });

    handleClose();
  };

  return (
    <>
      <div
        className={`${styles.overlay} ${visible ? styles.show : ""}`}
        onClick={handleClose}
      />
      <div className={`${styles.modal} ${visible ? styles.show : ""}`}>
        <div className={styles.header}>
          <X
            strokeWidth={1}
            className={styles.closeIcon}
            onClick={handleClose}
          />
        </div>

        <div className={styles.content}>
          <div className={styles.imageWrapper}>
            <Image src={image} alt={name} fill style={{ objectFit: "cover" }} />
          </div>

          <div className={styles.details}>
            <h4 className={styles.name}>{name}</h4>

            {colors.length > 0 && (
              <div className={styles.colors}>
                <span>Цвет:</span>
                <div className={styles.colorSwatches}>
                  {colors.map((c, i) => (
                    <div
                      key={i}
                      className={styles.swatch}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className={styles.sizeGrid}>
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={selectedSize === size ? styles.activeSize : ""}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className={styles.bottomRow}>
              <p className={styles.price}>{totalPrice}$</p>
              <div className={styles.quantity}>
                <button onClick={decrement}>-</button>
                <span>{quantity}</span>
                <button onClick={increment}>+</button>
              </div>
            </div>

            <button className={styles.addToCart} onClick={handleAddToCart}>
              В корзину
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
