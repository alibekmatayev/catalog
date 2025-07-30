import styles from "./FilterPanel.module.scss";

export default function FilterPanel({
  category,
  onCategoryChange,
  maxPrice,
  onMaxPriceChange,
}) {
  return (
    <aside className={styles.panel}>
      <h3>Фильтры</h3>

      <div className={styles.filterGroup}>
        <label>Категория</label>
        <select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="Все">Все</option>
          <option value="Кроссовки">Кроссовки</option>
          <option value="Футболки">Футболки</option>
        </select>
      </div>

      <div className={styles.filterGroup}>
        <label>Максимальная цена: {maxPrice}₸</label>
        <input
          type="range"
          min="0"
          max="500"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        />
      </div>
    </aside>
  );
}
