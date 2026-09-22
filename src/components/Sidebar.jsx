import React from 'react'
import {
  LayoutDashboard,
  CheckCircle2,
  Building2,
  PlusCircle,
  Calendar,
  BarChart3,
  Settings,
  Layers,
  UserCheck,
  ChevronRight,
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'availability', label: 'Room Availability', icon: CheckCircle2 },
  { id: 'management', label: 'Room Management', icon: Building2 },
  { id: 'allocate', label: 'Allocate Room', icon: PlusCircle },
  { id: 'schedule', label: 'Schedule', icon: Calendar },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) {
  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Brand Header */}
        <div className="brand-box">
          <div className="brand-logo">
            <Layers className="logo-icon" />
          </div>
          <div className="brand-title">
            <h2>ROOMFLOW</h2>
            <p>Smart Room Allocation System</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="nav-menu">
          <span className="nav-section-title">MAIN MENU</span>
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                type="button"
                className={`nav-link ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id)
                  setSidebarOpen(false)
                }}
              >
                <Icon className="nav-icon" />
                <span className="nav-label">{item.label}</span>
                {isActive && <ChevronRight className="active-chevron" />}
              </button>
            )
          })}
        </nav>

        {/* Footer Admin Card */}
        <div className="sidebar-footer">
          <div className="user-profile-card">
            <div className="user-avatar">
              <UserCheck size={20} />
              <span className="status-indicator online" />
            </div>
            <div className="user-info">
              <span className="user-name">Administrator</span>
              <span className="user-role">Admin User</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
