"use client";

import { useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductModal from "../ProductModal/ProductModal";
import Pagination from "../Pagination/Pagination";
import styles from "./ProductList.module.scss";

const { grid, empty, withFilter, noFilter: noFilterClass } = styles;

export default function ProductList({ products, noFilter }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  if (products.length === 0) {
    return <div className={empty}>Товары не найдены</div>;
  }

  return (
    <>
      <div className={`${grid} ${noFilter ? noFilterClass : withFilter}`}>
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            onClick={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      <div className={styles.paginationWrapper}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
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
