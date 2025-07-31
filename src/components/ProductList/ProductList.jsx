"use client";

import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductModal from "../ProductModal/ProductModal";
import styles from "./ProductList.module.scss";

const { grid, empty, withFilter, noFilter: noFilterClass } = styles;

export default function ProductList({ products, noFilter }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  if (products.length === 0) {
    return <div className={empty}>Товары не найдены</div>;
  }

  return (
    <>
      <div className={`${grid} ${noFilter ? noFilterClass : withFilter}`}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
