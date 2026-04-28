import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectItemsByCategory,
  selectActiveCategory,
  selectFilteredItems,
} from '../store/catalogSlice';
import CategoryFilter from '../components/CategoryFilter';
import ItemCard from '../components/ItemCard';
import styles from './Home.module.css';

const CATEGORY_ICONS = {
  Cars: '⬡',
  Bikes: '◎',
  Phones: '▣',
  Computers: '⬢',
};

const CAT_CLASS = {
  Cars: 'cars',
  Bikes: 'bikes',
  Phones: 'phones',
  Computers: 'computers',
};

export default function Home() {
  const itemsByCategory = useSelector(selectItemsByCategory);
  const activeCategory = useSelector(selectActiveCategory);
  const filteredItems = useSelector(selectFilteredItems);

  const categories = Object.keys(itemsByCategory);
  const totalItems = filteredItems.length;

  return (
    <div className={styles.page}>
      <CategoryFilter />

      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>
            {activeCategory === 'All' ? 'All Items' : activeCategory}
          </h1>
          <span className={styles.itemCount}>{totalItems} items</span>
        </div>
      </div>

      {totalItems === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>◈</span>
          <p>No items found</p>
        </div>
      ) : (
        <div className={styles.content}>
          {categories.map((cat) => (
            <section key={cat} className={styles.section}>
              <div className={`${styles.sectionHeader} ${styles[CAT_CLASS[cat] || 'default']}`}>
                <span className={styles.sectionIcon}>{CATEGORY_ICONS[cat] || '◈'}</span>
                <h2 className={styles.sectionTitle}>{cat}</h2>
                <span className={styles.sectionCount}>{itemsByCategory[cat].length}</span>
                <div className={styles.sectionLine} />
              </div>
              <div className={styles.grid}>
                {itemsByCategory[cat].map((item, i) => (
                  <ItemCard key={item.itemname} item={item} index={i} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
