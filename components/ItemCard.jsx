import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedItem } from '../store/catalogSlice';
import styles from './ItemCard.module.css';

const CAT_CLASS = {
  Cars: 'cars',
  Bikes: 'bikes',
  Phones: 'phones',
  Computers: 'computers',
};

export default function ItemCard({ item, index }) {
  const dispatch = useDispatch();
  const [imgError, setImgError] = useState(false);

  const catClass = CAT_CLASS[item.category] || 'default';
  const previewProps = item.itemprops.slice(0, 2);

  return (
    <article
      className={`${styles.card} animate-fade-up`}
      style={{ animationDelay: `${index * 0.05}s` }}
      onClick={() => dispatch(setSelectedItem(item))}
    >
      <div className={`${styles.imgWrap} ${styles[catClass]}`}>
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
        <div className={`${styles.catPill} ${styles[`pill_${catClass}`]}`}>
          {item.category}
        </div>
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{item.itemname}</h3>
        <div className={styles.props}>
          {previewProps.map((prop) => (
            <div key={prop.label} className={styles.prop}>
              <span className={styles.propLabel}>{prop.label}</span>
              <span className={styles.propValue}>{prop.value}</span>
            </div>
          ))}
        </div>
        <div className={styles.cta}>
          View Details
          <span className={styles.arrow}>→</span>
        </div>
      </div>
    </article>
  );
}
