"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";
import styles from "./CartPage.module.scss";
import Image from "next/image";

export default function CartPage() {
  const router = useRouter();
  const { cartItems, removeFromCart, clearCart } = useCart();
  const [confirmAction, setConfirmAction] = useState(null);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemoveOne = (id) => {
    setConfirmAction({ type: "removeOne", itemId: id });
  };

  const handleClearCart = () => {
    setConfirmAction({ type: "clearAll" });
  };

  const confirmActionHandler = () => {
    if (!confirmAction) return;

    if (confirmAction.type === "removeOne" && confirmAction.itemId != null) {
      removeFromCart(confirmAction.itemId);
    }
    if (confirmAction.type === "clearAll") {
      clearCart();
    }

    setConfirmAction(null);
  };

  const cancelActionHandler = () => {
    setConfirmAction(null);
  };

  return (
    <>
      <button className={styles.backButton} onClick={() => router.back()}>
        <ArrowLeft size={24} />
      </button>

      <div className={styles.cartPage}>
        <h2 className={styles.title}>Корзина</h2>

        {cartItems.length === 0 ? (
          <p className={styles.empty}>Корзина пуста</p>
        ) : (
          <div className={styles.content}>
            <ul className={styles.list}>
              {cartItems.map((item) => (
                <li
                  key={`${item.id}-${item.size || "no-size"}`}
                  className={styles.item}
                >
                  <div className={styles.imageWrapper}>
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={150}
                      height={150}
                      className={styles.itemImage}
                    />
                  </div>

                  <div className={styles.details}>
                    <strong>{item.name}</strong>

                    {item.size && (
                      <div className={styles.sizeInfo}>
                        Размер: <strong>{item.size}</strong>
                      </div>
                    )}

                    <div className={styles.quantityPrice}>
                      {item.quantity} × {item.price}$ ={" "}
                      <strong>
                        {(item.price * item.quantity).toFixed(2)}$
                      </strong>
                    </div>
                  </div>

                  <button
                    className={styles.removeButton}
                    onClick={() => handleRemoveOne(item.id)}
                  >
                    Удалить
                  </button>
                </li>
              ))}
            </ul>

            <div className={styles.summary}>
              <div className={styles.total}>
                <span>Итого:</span>
                <strong>{total.toFixed(2)}$</strong>
              </div>

              <button className={styles.clear} onClick={handleClearCart}>
                Очистить корзину
              </button>
              <button className={styles.checkout}>Оформить заказ</button>
            </div>
          </div>
        )}
      </div>

      {confirmAction && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <p>
              {confirmAction.type === "removeOne"
                ? "Вы уверены, что хотите удалить товар?"
                : "Вы уверены, что хотите очистить корзину?"}
            </p>
            <div className={styles.modalButtons}>
              <button onClick={confirmActionHandler} className={styles.yes}>
                Да
              </button>
              <button onClick={cancelActionHandler} className={styles.no}>
                Нет
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
