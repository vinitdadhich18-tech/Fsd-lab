import React, { useState, useEffect } from 'react'
import {
  BarChart3,
  PieChart,
  Building,
  TrendingUp,
  Layers,
  Calendar,
  Users,
} from 'lucide-react'

export default function ReportsView() {
  const [reports, setReports] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/reports')
      .then((res) => (res.ok ? res.json() : null))
      .then(setReports)
      .catch(() => setReports(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <div className="loading-state-box">Generating campus space analytics report...</div>
  }

  const buildingStats = reports?.buildingStats || {}
  const typeStats = reports?.typeStats || {}

  return (
    <div className="view-container">
      {/* View Header */}
      <div className="view-header">
        <div>
          <h1>REPORTS & ANALYTICS</h1>
          <p>Campus Infrastructure Utilization & Room Allocation Statistics</p>
        </div>
      </div>

      {/* Summary Stat Widgets */}
      <div className="stats-cards-grid">
        <div className="stat-card">
          <div className="stat-icon-wrapper bg-blue-subtle">
            <Building className="stat-icon text-indigo" size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">TOTAL CAMPUS ROOMS</span>
            <strong className="stat-number">{reports?.totalRooms || 25}</strong>
            <span className="stat-subtext">Registered spaces</span>
          </div>
        </div>

        <div className="stat-card accent-emerald">
          <div className="stat-icon-wrapper bg-emerald-subtle">
            <Calendar className="stat-icon text-emerald" size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">TOTAL ALLOCATIONS</span>
            <strong className="stat-number">{reports?.totalAllocations || 35}</strong>
            <span className="stat-subtext">Active & scheduled bookings</span>
          </div>
        </div>

        <div className="stat-card accent-amber">
          <div className="stat-icon-wrapper bg-amber-subtle">
            <TrendingUp className="stat-icon text-amber" size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">PEAK UTILIZATION</span>
            <strong className="stat-number">84%</strong>
            <span className="stat-subtext">Peak slot 10:00 - 12:00</span>
          </div>
        </div>

        <div className="stat-card accent-rose">
          <div className="stat-icon-wrapper bg-rose-subtle">
            <Users className="stat-icon text-rose" size={24} />
          </div>
          <div className="stat-info">
            <span className="stat-label">TOTAL SEATING CAPACITY</span>
            <strong className="stat-number">1,120</strong>
            <span className="stat-subtext">Available campus seats</span>
          </div>
        </div>
      </div>

      {/* Detailed Analysis Section */}
      <div className="reports-grid-2">
        {/* Building Distribution Card */}
        <div className="report-card">
          <div className="card-header-row">
            <h4>
              <Building size={18} className="text-indigo" /> Building Infrastructure Breakdown
            </h4>
          </div>
          <div className="building-progress-list">
            {Object.entries(buildingStats).map(([buildingName, data]) => {
              const maxRooms = 10
              const percentage = Math.min((data.totalRooms / maxRooms) * 100, 100)

              return (
                <div key={buildingName} className="building-progress-item">
                  <div className="item-title-row">
                    <strong>{buildingName}</strong>
                    <span>
                      {data.totalRooms} Rooms • Cap: {data.totalCapacity} Seats
                    </span>
                  </div>
                  <div className="progress-bar-bg">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Room Type Breakdown Card */}
        <div className="report-card">
          <div className="card-header-row">
            <h4>
              <Layers size={18} className="text-emerald" /> Space Type Distribution
            </h4>
          </div>
          <div className="type-distribution-grid">
            {Object.entries(typeStats).map(([type, count]) => (
              <div key={type} className="type-stat-pill-card">
                <span className="type-stat-name">{type}</span>
                <strong className="type-stat-count">{count}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
