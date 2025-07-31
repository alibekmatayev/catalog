"use client";

import { useState, useRef, useEffect } from "react";
import styles from "./SortSelect.module.scss";

const options = [
  { value: "default", label: "По умолчанию" },
  { value: "price_asc", label: "По цене ↑" },
  { value: "price_desc", label: "По цене ↓" },
  { value: "name", label: "По названию" },
];

export default function SortSelect({ sortBy, setSortBy }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLabel =
    options.find((opt) => opt.value === sortBy)?.label || "По умолчанию";
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.customSort} ref={dropdownRef}>
      <div className={styles.labelWrapper} onClick={() => setOpen(!open)}>
        <span className={styles.label}>Сортировка:</span>
        <span className={styles.selected}>{currentLabel}</span>
      </div>

      {open && (
        <ul className={styles.dropdown}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={styles.option}
              onClick={() => {
                setSortBy(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
