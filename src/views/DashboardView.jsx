import React from 'react'
import {
  Building2,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  Clock,
  Sparkles,
  Users,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import RoomCard from '../components/RoomCard'

export default function DashboardView({
  dashboard,
  loading,
  date,
  setDate,
  time,
  setTime,
  setNow,
  onSelectRoom,
  onAllocateRoom,
  onNavigateTab,
}) {
  const totals = dashboard?.totals || {
    rooms: 0,
    available: 0,
    occupied: 0,
    todayAllocations: 0,
    activeClasses: 0,
    fullClasses: 0,
  }

  const rooms = dashboard?.rooms || []
  const fullClasses = dashboard?.fullClasses || []
  const activeClasses = dashboard?.activeClasses || []

  return (
    <div className="dashboard-container">
      {/* Dashboard Greeting Header */}
      <div className="dashboard-header-banner">
        <div>
          <div className="greeting-chip">
            <Sparkles size={14} /> System Operational
          </div>
          <h1>Good Morning, Administrator</h1>
          <p className="subtitle-text">
            Smart Room Allocation & Campus Space Availability Overview
          </p>
        </div>
        <div className="quick-actions-bar">
          <button
            type="button"
            className="btn-quick-primary"
            onClick={() => onNavigateTab('allocate')}
          >
            + Allocate New Room
          </button>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="stats-cards-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-blue-subtle">
            <Building2 className="stat-icon text-indigo" size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">TOTAL ROOMS</span>
            <strong className="stat-number">{loading ? '--' : totals.rooms}</strong>
            <span className="stat-subtext">Across 4 campus blocks</span>
          </div>
        </div>

        <div className="stat-card accent-emerald">
          <div className="stat-icon-wrapper bg-emerald-subtle">
            <CheckCircle2 className="stat-icon text-emerald" size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">AVAILABLE NOW</span>
            <strong className="stat-number">{loading ? '--' : totals.available}</strong>
            <span className="stat-subtext">Ready for allocation</span>
          </div>
        </div>

        <div className="stat-card accent-rose">
          <div className="stat-icon-wrapper bg-rose-subtle">
            <XCircle className="stat-icon text-rose" size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">OCCUPIED NOW</span>
            <strong className="stat-number">{loading ? '--' : totals.occupied}</strong>
            <span className="stat-subtext">Classes in session</span>
          </div>
        </div>

        <div className="stat-card accent-amber">
          <div className="stat-icon-wrapper bg-amber-subtle">
            <CalendarCheck className="stat-icon text-amber" size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">TODAY'S ALLOCATIONS</span>
            <strong className="stat-number">{loading ? '--' : totals.todayAllocations}</strong>
            <span className="stat-subtext">Scheduled for {date}</span>
          </div>
        </div>
      </div>

      {/* Prominent LIVE ROOM AVAILABILITY Controls Bar */}
      <section className="live-availability-box">
        <div className="section-head-bar">
          <div>
            <span className="live-badge">
              <span className="live-pulse" /> LIVE ROOM AVAILABILITY
            </span>
            <h3>Real-Time Room Status according to DATE + TIME</h3>
          </div>
          <button type="button" className="btn-now-shortcut" onClick={setNow}>
            <Clock size={15} /> Use Current Time
          </button>
        </div>

        <div className="live-controls-row">
          <div className="control-group">
            <label htmlFor="dash-date">Select Date</label>
            <input
              id="dash-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="control-input"
            />
          </div>

          <div className="control-group">
            <label htmlFor="dash-time">Select Time</label>
            <input
              id="dash-time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="control-input"
            />
          </div>

          <div className="control-summary-chip">
            <Clock size={16} />
            <span>
              Checking spaces for <strong>{date}</strong> at <strong>{time}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Main Content Layout (Grid + Side Panel) */}
      <div className="dashboard-content-split">
        {/* Left: Rooms Grid */}
        <section className="rooms-display-section">
          <div className="section-title-row">
            <h4>
              Rooms Board ({rooms.length} {rooms.length === 1 ? 'room' : 'rooms'} found)
            </h4>
            <button
              type="button"
              className="view-all-link"
              onClick={() => onNavigateTab('availability')}
            >
              View Full Availability Board <ArrowRight size={14} />
            </button>
          </div>

          {loading ? (
            <div className="skeleton-cards-grid">
              <div className="skeleton-card" />
              <div className="skeleton-card" />
              <div className="skeleton-card" />
              <div className="skeleton-card" />
            </div>
          ) : rooms.length > 0 ? (
            <div className="room-cards-grid">
              {rooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  onSelectRoom={onSelectRoom}
                  onAllocateRoom={onAllocateRoom}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state-box">
              <Building2 size={40} className="empty-icon" />
              <h4>No Rooms Found</h4>
              <p>Try clearing your search query or changing filters.</p>
            </div>
          )}
        </section>

        {/* Right: Side Feed Panels */}
        <aside className="dashboard-side-panels">
          {/* Capacity Watch Panel */}
          <div className="side-panel-card">
            <div className="panel-header">
              <h4>
                <Users size={16} className="text-amber" /> Capacity Watch
              </h4>
              <span className="count-pill warning">{fullClasses.length} Full</span>
            </div>
            {fullClasses.length > 0 ? (
              <div className="panel-list">
                {fullClasses.map((item) => (
                  <div key={item.id} className="capacity-item">
                    <div className="capacity-top">
                      <strong>{item.name}</strong>
                      <span className="time-pill">{item.start} - {item.end}</span>
                    </div>
                    <p className="capacity-sub">
                      {item.code} • Room {item.roomId} • {item.instructor}
                    </p>
                    <div className="capacity-bar-container">
                      <div className="capacity-bar-fill filled" style={{ width: '100%' }} />
                    </div>
                    <div className="capacity-meta-line">
                      <span>Full Capacity</span>
                      <strong>{item.enrolled} / {item.capacity} Seats Filled</strong>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="panel-empty-text">
                <CheckCircle2 size={18} className="text-emerald" />
                <span>All active classes currently have remaining seat capacity.</span>
              </div>
            )}
          </div>

          {/* Active Classes Summary Panel */}
          <div className="side-panel-card">
            <div className="panel-header">
              <h4>
                <TrendingUp size={16} className="text-indigo" /> Active Sessions ({time})
              </h4>
              <span className="count-pill">{activeClasses.length} Active</span>
            </div>
            <div className="panel-list">
              {activeClasses.slice(0, 4).map((c) => (
                <div key={c.id} className="active-session-item">
                  <div className="session-left">
                    <span className="room-chip">{c.roomId}</span>
                  </div>
                  <div className="session-center">
                    <strong className="session-name">{c.name}</strong>
                    <span className="session-batch">
                      {c.batch || 'Class'} • {c.instructor}
                    </span>
                  </div>
                  <div className="session-right">
                    <span className="session-time">{c.start}–{c.end}</span>
                  </div>
                </div>
              ))}
              {activeClasses.length === 0 && (
                <p className="text-muted p-3 text-center">No active classes at {time}.</p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
