"use client";

import { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/services/api";
import ProductList from "../../components/ProductList/ProductList";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import Header from "@/components/Header/Header";
import SortSelect from "@/components/SortSelect/SortSelect";
import styles from "./ProductPage.module.scss";
import { X, SlidersHorizontal } from "lucide-react";

const {
  pageHeader,
  controls,
  productPage,
  productContainer,
  withFilter,
  noFilter,
  mobileFilterOverlay,
  mobileFilterPanel,
} = styles;

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Все");
  const [maxPrice, setMaxPrice] = useState(500);
  const [showFilter, setShowFilter] = useState(true);
  const [sortBy, setSortBy] = useState("default");
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 960);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const availableColors = useMemo(() => {
    const colors = products.flatMap((p) => p.colors || []);
    return Array.from(new Set(colors));
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchCategory = category === "Все" || product.category === category;
      const matchPrice = product.price <= maxPrice;
      const matchColor =
        !selectedColor ||
        (product.colors && product.colors.includes(selectedColor));

      return matchCategory && matchPrice && matchColor;
    });

    if (sortBy === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, category, maxPrice, sortBy, selectedColor]);

  return (
    <>
      <Header />
      <div className={pageHeader}>
        <h2>ПРОДУКТЫ</h2>

        <div className={controls}>
          <button
            onClick={() => {
              if (isMobile) {
                setIsModalOpen(true);
              } else {
                setShowFilter((prev) => !prev);
              }
            }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
            }}
          >
            {isMobile
              ? "Фильтр"
              : showFilter
              ? "Убрать фильтр"
              : "Показать фильтр"}
            <SlidersHorizontal size={18} strokeWidth={1.8} />
          </button>

          {!isMobile && <SortSelect sortBy={sortBy} setSortBy={setSortBy} />}
        </div>
      </div>

      <div className={productPage}>
        <div
          className={`${productContainer} ${
            !isMobile && showFilter ? withFilter : noFilter
          }`}
        >
          {/* Десктопная версия фильтра */}
          {!isMobile && showFilter && (
            <FilterPanel
              category={category}
              onCategoryChange={setCategory}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              availableColors={availableColors}
            />
          )}

          {isLoading ? (
            <p>Загрузка товаров...</p>
          ) : (
            <ProductList
              products={filteredProducts}
              noFilter={!isMobile && !showFilter}
            />
          )}
        </div>
      </div>

      {/* Мобильная модалка фильтра */}
      {isMobile && isModalOpen && (
        <>
          <div
            className={mobileFilterOverlay}
            onClick={() => setIsModalOpen(false)}
          />

          <div className={mobileFilterPanel}>
            <X
              size={24}
              className={styles.closeIcon}
              onClick={() => setIsModalOpen(false)}
            />

            {/* Отдельный рендер фильтра для мобильной версии */}
            <FilterPanel
              category={category}
              onCategoryChange={setCategory}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedColor={selectedColor}
              onColorChange={setSelectedColor}
              availableColors={availableColors}
            />

            <SortSelect sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </>
      )}
    </>
  );
}
