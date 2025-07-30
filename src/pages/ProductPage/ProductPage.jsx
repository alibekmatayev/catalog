"use client";

import { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/services/api";
import ProductList from "../../components/ProductList/ProductList";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Header from "@/components/Header/Header";
import styles from "./ProductPage.module.scss";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Все");
  const [maxPrice, setMaxPrice] = useState(500);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Ошибка загрузки:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchCategory = category === "Все" || product.category === category;
      const matchPrice = product.price <= maxPrice;
      return matchCategory && matchPrice;
    });
  }, [products, category, maxPrice]);

  return (
    <>
      <Header />

      <div className={styles.productPage}>
        <h2>Продукты</h2>
        <div className={styles.productContainer}>
          <FilterPanel
            category={category}
            onCategoryChange={setCategory}
            maxPrice={maxPrice}
            onMaxPriceChange={setMaxPrice}
          />
          {isLoading ? (
            <p>Загрузка товаров...</p>
          ) : (
            <ProductList products={filteredProducts} />
          )}
        </div>
      </div>
    </>
  );
}
