import React from "react";
import "./styles/navbar.css";
import { signOut } from "../firebase";

export default function Navbar({ user, avatar, setUser }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src="/logo.png" alt="Logo" />
      </div>

      {user && (
        <div className="navbar-user">
          <span className="welcome-text">Welcome, {user.displayName}</span>
          <img
            src={avatar || "/default-avatar.png"}
            alt={user.displayName}
            className="user-avatar"
          />
          <button
            className="logout-btn"
            onClick={() => signOut().then(() => setUser(null))}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
