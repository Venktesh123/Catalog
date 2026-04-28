import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedItem, selectSelectedItem } from '../store/catalogSlice';
import styles from './ItemDetail.module.css';

const CAT_CLASS = {
  Cars: 'cars',
  Bikes: 'bikes',
  Phones: 'phones',
  Computers: 'computers',
};

const CAT_ICONS = {
  Cars: '⬡',
  Bikes: '◎',
  Phones: '▣',
  Computers: '⬢',
};

export default function ItemDetail() {
  const dispatch = useDispatch();
  const item = useSelector(selectSelectedItem);
  const [imgError, setImgError] = useState(false);

  if (!item) return null;

  const catClass = CAT_CLASS[item.category] || 'default';

  return (
    <div className={`${styles.page} animate-fade-in`}>
      {/* Back button */}
      <button className={styles.backBtn} onClick={() => dispatch(clearSelectedItem())}>
        <span className={styles.backArrow}>←</span>
        <span>Back to Catalog</span>
      </button>

      <div className={`${styles.layout} animate-scale-in`}>
        {/* Image panel */}
        <div className={`${styles.imgPanel} ${styles[catClass]}`}>
          <div className={styles.categoryLabel}>
            <span className={styles.catIcon}>{CAT_ICONS[item.category]}</span>
            <span>{item.category}</span>
          </div>

          {!imgError ? (
            <img
              src={item.image}
              alt={item.itemname}
              className={styles.img}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className={styles.imgFallback}>
              <span>{item.itemname[0]}</span>
            </div>
          )}

          <div className={styles.imgGlow} />
        </div>

        {/* Info panel */}
        <div className={styles.infoPanel}>
          <div className={styles.nameArea}>
            <h1 className={styles.itemName}>{item.itemname}</h1>
            <div className={`${styles.catBadge} ${styles[`badge_${catClass}`]}`}>
              {item.category}
            </div>
          </div>

          <div className={styles.divider} />

          <div className={styles.specsSection}>
            <p className={styles.specsHeading}>SPECIFICATIONS</p>
            <div className={styles.specsList}>
              {item.itemprops.map((prop, i) => (
                <div
                  key={prop.label}
                  className={styles.specRow}
                  style={{ animationDelay: `${0.1 + i * 0.07}s` }}
                >
                  <span className={styles.specLabel}>{prop.label}</span>
                  <span className={`${styles.specValue} ${styles[`specVal_${catClass}`]}`}>
                    {prop.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.statBubble}>
              <span className={styles.statNum}>{item.itemprops.length}</span>
              <span className={styles.statLabel}>Specs</span>
            </div>
            <div className={styles.statBubble}>
              <span className={styles.statNum}>{item.category}</span>
              <span className={styles.statLabel}>Category</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
