import React, { useState, useEffect } from 'react';
import styles from '../AIImageGenerator.module.css';

const Toast = ({ message, type, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose();
    }, 3000); // Toast disappears after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!isVisible) return null;

  const toastClass = `${styles.toast} ${styles[type]}`;

  return (
    <div className={toastClass}>
      <span>{message}</span>
      <button onClick={() => {
        setIsVisible(false);
        onClose();
      }} className={styles.toastCloseButton}>&times;</button>
    </div>
  );
};

export default Toast;