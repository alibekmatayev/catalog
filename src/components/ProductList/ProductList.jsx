import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductList.module.scss";

const { grid } = styles;

export default function ProductList({ products }) {
  if (products.length === 0) {
    return <p>Нет товаров по выбранным фильтрам.</p>;
  }

  return (
    <div className={grid}>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
