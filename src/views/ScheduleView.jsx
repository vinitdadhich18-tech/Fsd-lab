import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  BookOpen,
  User,
  Users,
  Search,
  CheckCircle,
  Clock3,
  CheckCircle2,
  Trash2,
} from 'lucide-react'

export default function ScheduleView({ date: initialDate, setDate: setGlobalDate }) {
  const [selectedDate, setSelectedDate] = useState(initialDate || '2026-09-22')
  const [allocations, setAllocations] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const currentTimeStr = '10:30' // Current reference time

  const fetchSchedule = (d) => {
    setLoading(true)
    fetch(`/api/allocations?date=${d}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setAllocations(data)
      })
      .catch(() => setAllocations([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchSchedule(selectedDate)
  }, [selectedDate])

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate)
    if (setGlobalDate) setGlobalDate(newDate)
  }

  const handleDeleteAllocation = (id, name) => {
    if (!window.confirm(`Are you sure you want to cancel allocation for "${name}"?`)) return

    fetch(`/api/allocations/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => fetchSchedule(selectedDate))
  }

  const getItemStatus = (start, end) => {
    if (end <= currentTimeStr) return 'Completed'
    if (start <= currentTimeStr && currentTimeStr < end) return 'Ongoing'
    return 'Upcoming'
  }

  const filteredAllocations = allocations.filter((item) => {
    const itemStatus = getItemStatus(item.start, item.end)
    if (statusFilter !== 'All' && itemStatus !== statusFilter) return false
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      item.name.toLowerCase().includes(q) ||
      item.roomId.toLowerCase().includes(q) ||
      item.instructor.toLowerCase().includes(q) ||
      (item.batch && item.batch.toLowerCase().includes(q))
    )
  })

  // Sort by start time
  const sortedAllocations = [...filteredAllocations].sort((a, b) =>
    a.start.localeCompare(b.start)
  )

  return (
    <div className="view-container">
      {/* View Header */}
      <div className="view-header">
        <div>
          <h1>DAILY ROOM SCHEDULE</h1>
          <p>Master Schedule & Room Allocation Timetable</p>
        </div>
      </div>

      {/* Date Bar & Controls */}
      <div className="date-time-bar">
        <div className="dt-field">
          <Calendar size={18} className="text-indigo" />
          <label htmlFor="sched-date">Select Date:</label>
          <input
            id="sched-date"
            type="date"
            value={selectedDate}
            onChange={(e) => handleDateChange(e.target.value)}
          />
        </div>

        <div className="dt-summary-badge">
          <span>Scheduled Allocations for {selectedDate}: <strong>{allocations.length} Sessions</strong></span>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filters-control-panel">
        <div className="search-filter-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search class, room, faculty, or batch..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-select-group">
          <label>Filter Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Ongoing">Ongoing Sessions</option>
            <option value="Upcoming">Upcoming Sessions</option>
            <option value="Completed">Completed Sessions</option>
          </select>
        </div>
      </div>

      {/* Schedule Table */}
      {loading ? (
        <div className="loading-state-box">Loading daily master schedule...</div>
      ) : sortedAllocations.length === 0 ? (
        <div className="empty-state-box">
          <Clock3 size={40} className="empty-icon" />
          <h4>No Schedule Records Found</h4>
          <p>There are no room allocations recorded for {selectedDate}.</p>
        </div>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="custom-table schedule-table">
            <thead>
              <tr>
                <th>Time Slot</th>
                <th>Room</th>
                <th>Class / Batch</th>
                <th>Subject / Event</th>
                <th>Faculty</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sortedAllocations.map((item) => {
                const status = getItemStatus(item.start, item.end)
                return (
                  <tr key={item.id} className={`sched-row status-${status.toLowerCase()}`}>
                    <td>
                      <div className="time-slot-badge">
                        <Clock size={14} />
                        <span>{item.start} – {item.end}</span>
                      </div>
                    </td>
                    <td>
                      <strong className="room-id-chip">{item.roomId}</strong>
                    </td>
                    <td>
                      <span className="batch-pill">{item.batch || 'CSE-3A'}</span>
                    </td>
                    <td>
                      <div>
                        <strong className="subject-title">{item.name}</strong>
                        {item.code && <span className="course-code">({item.code})</span>}
                      </div>
                    </td>
                    <td>{item.instructor}</td>
                    <td>
                      <span className="purpose-tag">{item.purpose || 'Lecture'}</span>
                    </td>
                    <td>
                      <span className={`status-badge-pill ${status.toLowerCase()}`}>
                        {status === 'Ongoing' && <span className="pulse-dot" />}
                        {status}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className="btn-icon-action text-rose"
                        onClick={() => handleDeleteAllocation(item.id, item.name)}
                        title="Cancel Allocation"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
