import React, { useState } from 'react'
import {
  Search,
  Bell,
  Sun,
  Moon,
  Menu,
  X,
  Calendar as CalendarIcon,
  CheckCircle,
  AlertTriangle,
  Info,
} from 'lucide-react'

export default function TopNavbar({
  query,
  setQuery,
  date,
  darkMode,
  setDarkMode,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, type: 'alert', title: 'High Demand Peak', message: 'Academic Block A is 92% occupied at 10:30 AM', time: '10 mins ago' },
    { id: 2, type: 'success', title: 'New Room Allocation', message: 'Room ST-201 allocated to AI & ML Lab (AI-1A)', time: '35 mins ago' },
    { id: 3, type: 'info', title: 'System Maintenance', message: 'Scheduled server optimization at 8:00 PM', time: '2 hours ago' },
  ]

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <header className="top-navbar">
      {/* Mobile Toggle */}
      <button
        type="button"
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Navigation"
      >
        {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Global Search Input */}
      <div className="search-bar-container">
        <Search className="search-icon" size={18} />
        <input
          type="search"
          className="global-search-input"
          placeholder="Search room number, building, class, or faculty..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button type="button" className="clear-search-btn" onClick={() => setQuery('')}>
            <X size={14} />
          </button>
        )}
      </div>

      {/* Right Controls */}
      <div className="top-actions">
        {/* Date Display */}
        <div className="date-badge">
          <CalendarIcon size={15} />
          <span>{formattedDate}</span>
        </div>

        {/* Theme Switcher */}
        <button
          type="button"
          className="theme-toggle-btn"
          onClick={() => setDarkMode(!darkMode)}
          title={`Switch to ${darkMode ? 'Light' : 'Dark'} Mode`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Notification Bell */}
        <div className="notification-wrapper">
          <button
            type="button"
            className="icon-action-btn"
            onClick={() => setShowNotifications(!showNotifications)}
            title="Notifications"
          >
            <Bell size={18} />
            <span className="notification-dot">3</span>
          </button>

          {showNotifications && (
            <div className="notification-dropdown">
              <div className="notification-header">
                <h4>System Notifications</h4>
                <span className="unread-badge">3 New</span>
              </div>
              <div className="notification-list">
                {notifications.map((n) => (
                  <div key={n.id} className={`notification-item ${n.type}`}>
                    <div className="notification-icon">
                      {n.type === 'alert' && <AlertTriangle size={16} />}
                      {n.type === 'success' && <CheckCircle size={16} />}
                      {n.type === 'info' && <Info size={16} />}
                    </div>
                    <div className="notification-content">
                      <p className="notification-title">{n.title}</p>
                      <p className="notification-msg">{n.message}</p>
                      <span className="notification-time">{n.time}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="notification-footer">
                <button type="button" onClick={() => setShowNotifications(false)}>
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Avatar */}
        <div className="nav-profile-chip">
          <div className="avatar-circle">AD</div>
          <span className="admin-chip-label">Admin</span>
        </div>
      </div>
    </header>
  )
}
