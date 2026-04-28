import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setActiveCategory,
  selectCategories,
  selectActiveCategory,
  selectAllItems,
} from '../store/catalogSlice';
import styles from './CategoryFilter.module.css';

const CATEGORY_ICONS = {
  All: '◈',
  Cars: '⬡',
  Bikes: '◎',
  Phones: '▣',
  Computers: '⬢',
};

export default function CategoryFilter() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const activeCategory = useSelector(selectActiveCategory);
  const allItems = useSelector(selectAllItems);

  const getCount = (cat) =>
    cat === 'All'
      ? allItems.length
      : allItems.filter((i) => i.category === cat).length;

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterScroll}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ''} ${styles[`cat_${cat.toLowerCase()}`] || ''}`}
            onClick={() => dispatch(setActiveCategory(cat))}
          >
            <span className={styles.icon}>{CATEGORY_ICONS[cat] || '◈'}</span>
            <span className={styles.label}>{cat}</span>
            <span className={styles.count}>{getCount(cat)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
