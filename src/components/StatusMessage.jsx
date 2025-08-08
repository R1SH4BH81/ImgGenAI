import React from "react";
import styles from "../AIImageGenerator.module.css";

const StatusMessage = ({ type, message }) => {
  const className = `${styles.statusMessage} ${
    styles[`status${type.charAt(0).toUpperCase() + type.slice(1)}`]
  }`;

  return <div className={className}>{message}</div>;
};

export default StatusMessage;
