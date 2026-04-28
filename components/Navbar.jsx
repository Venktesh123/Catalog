import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  clearSelectedItem,
  setActiveCategory,
  selectSearchQuery,
  selectSelectedItem,
} from '../store/catalogSlice';
import styles from './Navbar.module.css';

export default function Navbar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector(selectSearchQuery);
  const selectedItem = useSelector(selectSelectedItem);

  const handleLogoClick = () => {
    dispatch(clearSelectedItem());
    dispatch(setActiveCategory('All'));
    dispatch(setSearchQuery(''));
  };

  return (
    <nav className={styles.navbar}>
      <button className={styles.logo} onClick={handleLogoClick}>
        <span className={styles.logoMark}>◈</span>
        <span className={styles.logoText}>CATALOX</span>
      </button>

      {!selectedItem && (
        <div className={styles.searchWrap}>
          <span className={styles.searchIcon}>⌕</span>
          <input
            className={styles.search}
            type="text"
            placeholder="Search items..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
          {searchQuery && (
            <button className={styles.clearSearch} onClick={() => dispatch(setSearchQuery(''))}>
              ✕
            </button>
          )}
        </div>
      )}

      <div className={styles.badge}>
        {selectedItem ? (
          <span className={styles.detailBadge}>DETAIL VIEW</span>
        ) : (
          <span className={styles.catalogBadge}>CATALOG</span>
        )}
      </div>
    </nav>
  );
}
