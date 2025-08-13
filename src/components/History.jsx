import React, { useEffect, useState } from "react";
import styles from "./HistoryOverlay.module.css";
import Toast from "./Toast"; // Import your Toast
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";
import { db } from "../firebase";
import "./styles/Button.css";

const HistoryOverlay = ({ userId, onClose }) => {
  const [history, setHistory] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [noMore, setNoMore] = useState(false);
  const [toast, setToast] = useState(null); // toast state

  const fetchHistory = async (loadMore = false) => {
    if (!userId) return;
    setLoading(true);

    try {
      let q = query(
        collection(db, `history/${userId}/images`),
        orderBy("timestamp", "desc"),
        limit(10)
      );

      if (loadMore && lastDoc) {
        q = query(
          collection(db, `history/${userId}/images`),
          orderBy("timestamp", "desc"),
          startAfter(lastDoc),
          limit(10)
        );
      }

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setHistory((prev) => (loadMore ? [...prev, ...newData] : newData));
        setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

        if (snapshot.size < 10) setNoMore(true);
      } else {
        setNoMore(true);
      }
    } catch (error) {
      console.error("Error fetching history:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchHistory();
  }, [userId]);

  const handleCopyPrompt = async (prompt) => {
    try {
      await navigator.clipboard.writeText(prompt);
      setToast({ message: "Prompt copied to clipboard!", type: "success" });
    } catch (err) {
      console.error("Failed to copy:", err);
      setToast({ message: "Failed to copy prompt.", type: "error" });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.historyBox}>
        <div className={styles.closeBtn} onClick={onClose}>
          ✖
        </div>
        <h2>Your Image History</h2>

        <div className={styles.historyGrid}>
          {history.map((item) => (
            <div key={item.id} className={styles.historyCard}>
              <img
                src={item.url}
                alt="Generated"
                className={styles.historyImage}
              />
              <p
                className={styles.prompt}
                onClick={() => handleCopyPrompt(item.prompt)}
                style={{ cursor: "pointer" }}
                title="Click to copy"
              >
                {item.prompt}
              </p>
              <div className={styles.saveWrapper}>
                <div
                  className="bookmarkBtn"
                  onClick={() => window.open(item.url, "_blank")}
                >
                  <span className="IconContainer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="black"
                    >
                      <path d="m480-320 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160Zm0 240q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                    </svg>
                  </span>
                  <p className="text">Save</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loading && <p className={styles.loadingText}>Loading...</p>}
        {!loading && !noMore && (
          <button
            className={styles.loadMore}
            onClick={() => fetchHistory(true)}
          >
            Load More
          </button>
        )}
        {noMore && <p className={styles.endText}>No more history.</p>}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default HistoryOverlay;
