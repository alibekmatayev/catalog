import styles from "./FilterPanel.module.scss";

const { panel, filterGroup } = styles;

export default function FilterPanel({
  category,
  onCategoryChange,
  maxPrice,
  onMaxPriceChange,
  selectedColor,
  onColorChange,
  availableColors = [],
}) {
  return (
    <aside className={panel}>
      <div className={filterGroup}>
        <ul className={styles.categoryList}>
          {["Все", "Кроссовки", "Футболки"].map((item) => (
            <li
              key={item}
              className={`${styles.categoryItem} ${
                category === item ? styles.active : ""
              }`}
              onClick={() => onCategoryChange(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className={filterGroup}>
        <label>Максимальная цена: {maxPrice}$</label>
        <input
          type="range"
          min="0"
          max="500"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
        />
      </div>

      <div className={filterGroup}>
        <span>Цвет:</span>
        <div className={styles.colorSwatches}>
          {availableColors.map((color) => (
            <div
              key={color}
              className={`${styles.colorSwatch} ${
                selectedColor === color ? styles.activeColor : ""
              }`}
              style={{ backgroundColor: color }}
              onClick={() =>
                onColorChange(selectedColor === color ? null : color)
              }
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
