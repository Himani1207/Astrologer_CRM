import React, { useState } from 'react';
import { Search, Bell, Menu, User, ChevronDown } from 'lucide-react';

const Navbar = ({ adminName, searchQuery, onSearchChange, toggleMobileSidebar, notifications = [], setNotifications }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="navbar">
      <div className="navbar-left">
        <button onClick={toggleMobileSidebar} className="menu-toggle-btn" aria-label="Toggle Menu">
          <Menu size={22} />
        </button>
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search astrologers, customers, or consultations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="navbar-right">
        {/* Notification center */}
        <div className="notification-wrapper">
          <button 
            className="notification-btn" 
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="Notifications"
          >
            <Bell size={20} />
            {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
          </button>

          {showNotifications && (
            <div className="notification-dropdown glass-panel">
              <div className="dropdown-header">
                <h3>Notifications</h3>
                {unreadCount > 0 && (
                  <button onClick={markAllRead} className="mark-read-btn">
                    Mark all read
                  </button>
                )}
              </div>
              <div className="dropdown-body">
                {notifications.length === 0 ? (
                  <p className="no-notifications">No new notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`notification-item ${!n.read ? 'unread' : ''}`}>
                      <p className="notification-text">{n.text}</p>
                      <span className="notification-time">{n.time}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div className="profile-card">
          <div className="avatar-circle">
            <User size={18} className="avatar-icon" />
          </div>
          <div className="profile-info">
            <span className="welcome-text">Welcome Back,</span>
            <span className="admin-name">{adminName}</span>
          </div>
          <ChevronDown size={14} className="profile-arrow" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .navbar {
          height: var(--navbar-height);
          background-color: var(--bg-card);
          border-bottom: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: sticky;
          top: 0;
          z-index: 90;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .navbar-left {
          display: flex;
          align-items: center;
          gap: 1rem;
          flex: 1;
          max-width: 500px;
        }

        .menu-toggle-btn {
          display: none;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          padding: 0.25rem;
          border-radius: var(--radius-sm);
        }

        .menu-toggle-btn:hover {
          background-color: var(--bg-main);
          color: var(--text-primary);
        }

        .search-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 0.85rem;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }

        .search-input {
          width: 100%;
          padding: 0.65rem 1rem 0.65rem 2.5rem;
          border-radius: var(--radius-sm);
          border: 1px solid var(--border-color);
          background-color: var(--bg-main);
          color: var(--text-primary);
          font-size: 0.875rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          background-color: var(--bg-card);
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .notification-wrapper {
          position: relative;
        }

        .notification-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          position: relative;
          padding: 0.5rem;
          border-radius: var(--radius-full);
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notification-btn:hover {
          background-color: var(--bg-main);
          color: var(--text-primary);
        }

        .notification-badge {
          position: absolute;
          top: 4px;
          right: 4px;
          background-color: var(--accent);
          color: var(--text-primary);
          font-size: 0.65rem;
          font-weight: 700;
          height: 16px;
          min-width: 16px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 2px;
          border: 2px solid var(--bg-card);
        }

        .notification-dropdown {
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          width: 320px;
          border-radius: var(--radius-md);
          overflow: hidden;
          box-shadow: var(--shadow-xl);
          z-index: 100;
          animation: fadeIn 0.2s ease forwards;
        }

        .dropdown-header {
          padding: 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dropdown-header h3 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .mark-read-btn {
          background: transparent;
          border: none;
          color: var(--primary);
          font-size: 0.75rem;
          font-weight: 600;
          cursor: pointer;
        }

        .dropdown-body {
          max-height: 250px;
          overflow-y: auto;
        }

        .notification-item {
          padding: 0.85rem 1rem;
          border-bottom: 1px solid rgba(0, 0, 0, 0.03);
          transition: background-color 0.2s;
        }

        .notification-item:last-child {
          border-bottom: none;
        }

        .notification-item.unread {
          background-color: rgba(79, 70, 229, 0.04);
        }

        .notification-text {
          font-size: 0.825rem;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
          line-height: 1.35;
        }

        .notification-time {
          font-size: 0.7rem;
          color: var(--text-muted);
        }

        .no-notifications {
          padding: 2rem;
          text-align: center;
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        .profile-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.35rem 0.75rem;
          border-radius: var(--radius-full);
          background-color: var(--bg-main);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .profile-card:hover {
          background-color: var(--border-color);
        }

        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: var(--radius-full);
          background-color: var(--primary-light);
          color: var(--primary);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-icon {
          color: var(--primary);
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .welcome-text {
          font-size: 0.65rem;
          color: var(--text-muted);
          font-weight: 500;
        }

        .admin-name {
          font-size: 0.825rem;
          font-weight: 600;
          color: var(--text-primary);
          margin-top: -2px;
        }

        .profile-arrow {
          color: var(--text-secondary);
        }

        @media (max-width: 1024px) {
          .menu-toggle-btn {
            display: block;
          }
          .navbar {
            padding: 0 1.25rem;
          }
        }

        @media (max-width: 640px) {
          .welcome-text, .profile-arrow {
            display: none;
          }
          .profile-card {
            padding: 0.25rem;
            background: transparent;
            border: none;
          }
          .profile-info {
            display: none;
          }
          .search-input {
            width: 150px;
          }
          .search-input:focus {
            width: 220px;
          }
        }
      `}} />
    </header>
  );
};

export default Navbar;
