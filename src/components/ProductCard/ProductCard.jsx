import Image from "next/image";
import styles from "./ProductCard.module.scss";

const { card, imageWrapper, cardText } = styles;

export default function ProductCard({ name, price, image, onClick }) {
  return (
    <div className={card} onClick={onClick} style={{ cursor: "pointer" }}>
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
