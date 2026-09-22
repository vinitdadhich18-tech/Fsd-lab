import React, { useState } from 'react'
import {
  Calendar,
  Clock,
  Filter,
  Search,
  Grid,
  List,
  ArrowUpDown,
  Building,
  CheckCircle2,
  XCircle,
  Clock3,
} from 'lucide-react'
import RoomCard from '../components/RoomCard'

export default function AvailabilityView({
  dashboard,
  loading,
  date,
  setDate,
  time,
  setTime,
  onSelectRoom,
  onAllocateRoom,
}) {
  const [selectedBuilding, setSelectedBuilding] = useState('All')
  const [selectedType, setSelectedType] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedFloor, setSelectedFloor] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('id') // 'id', 'capacity', 'status'
  const [viewMode, setViewMode] = useState('grid') // 'grid', 'table'

  const allRooms = dashboard?.rooms || []

  // Filter rooms
  const filteredRooms = allRooms.filter((room) => {
    if (selectedBuilding !== 'All' && room.building !== selectedBuilding) return false
    if (selectedType !== 'All' && room.type !== selectedType) return false
    if (selectedStatus !== 'All' && room.status !== selectedStatus) return false
    if (selectedFloor !== 'All' && room.floor !== selectedFloor) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const haystack = [
        room.id,
        room.building,
        room.floor,
        room.type,
        ...room.equipment,
        room.booking?.name,
        room.booking?.instructor,
      ].join(' ').toLowerCase()
      if (!haystack.includes(q)) return false
    }
    return true
  })

  // Sort rooms
  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortBy === 'capacity') return b.capacity - a.capacity
    if (sortBy === 'status') return a.status.localeCompare(b.status)
    return a.id.localeCompare(b.id)
  })

  const availableCount = sortedRooms.filter((r) => r.status === 'available').length
  const occupiedCount = sortedRooms.filter((r) => r.status === 'occupied').length

  return (
    <div className="view-container">
      {/* View Header */}
      <div className="view-header">
        <div>
          <h1>ROOM AVAILABILITY</h1>
          <p>Real-Time Campus Room Availability & Schedule Inspection</p>
        </div>
      </div>

      {/* Top Primary Date & Time Controls Bar */}
      <div className="date-time-bar">
        <div className="dt-field">
          <Calendar size={18} className="text-indigo" />
          <label htmlFor="avail-date">Select Date:</label>
          <input
            id="avail-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="dt-field">
          <Clock size={18} className="text-indigo" />
          <label htmlFor="avail-time">Select Time:</label>
          <input
            id="avail-time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className="dt-summary-badge">
          <span className="dot-available" /> Free: <strong>{availableCount}</strong>
          <span className="dot-occupied ml-3" /> Occupied: <strong>{occupiedCount}</strong>
        </div>
      </div>

      {/* Filters & Controls Panel */}
      <div className="filters-control-panel">
        <div className="search-filter-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search room number, building, or equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters-row">
          <div className="filter-select-group">
            <label>Building:</label>
            <select
              value={selectedBuilding}
              onChange={(e) => setSelectedBuilding(e.target.value)}
            >
              <option value="All">All Buildings</option>
              <option value="Academic Block A">Academic Block A</option>
              <option value="Academic Block B">Academic Block B</option>
              <option value="Science & Tech Building">Science & Tech Building</option>
              <option value="Innovation Centre">Innovation Centre</option>
            </select>
          </div>

          <div className="filter-select-group">
            <label>Room Type:</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Classroom">Classroom</option>
              <option value="Lecture Hall">Lecture Hall</option>
              <option value="Computer Lab">Computer Lab</option>
              <option value="Laboratory">Laboratory</option>
              <option value="Seminar Hall">Seminar Hall</option>
              <option value="Conference Room">Conference Room</option>
            </select>
          </div>

          <div className="filter-select-group">
            <label>Status:</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="available">Available Only</option>
              <option value="occupied">Occupied Only</option>
            </select>
          </div>

          <div className="filter-select-group">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="id">Room Number</option>
              <option value="capacity">Capacity (High to Low)</option>
              <option value="status">Status (Available First)</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="view-toggle-btns">
            <button
              type="button"
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              <Grid size={16} />
            </button>
            <button
              type="button"
              className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
              onClick={() => setViewMode('table')}
              title="Table View"
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Display */}
      {loading ? (
        <div className="loading-state-box">Checking real-time room status...</div>
      ) : sortedRooms.length === 0 ? (
        <div className="empty-state-box">
          <Building size={40} className="empty-icon" />
          <h4>No Rooms Match Filters</h4>
          <p>Try resetting filters or adjusting search queries.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="room-cards-grid">
          {sortedRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onSelectRoom={onSelectRoom}
              onAllocateRoom={onAllocateRoom}
            />
          ))}
        </div>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Building</th>
                <th>Floor</th>
                <th>Type</th>
                <th>Capacity</th>
                <th>Current Status</th>
                <th>Allocated / Booking Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedRooms.map((room) => {
                const isOccupied = room.status === 'occupied'
                const booking = room.booking
                return (
                  <tr key={room.id}>
                    <td>
                      <strong className="room-id-chip">{room.id}</strong>
                    </td>
                    <td>{room.building}</td>
                    <td>{room.floor}</td>
                    <td>
                      <span className="type-pill">{room.type}</span>
                    </td>
                    <td>{room.capacity} Seats</td>
                    <td>
                      <span className={`status-pill ${isOccupied ? 'occupied' : 'available'}`}>
                        {isOccupied ? '🔴 OCCUPIED' : '🟢 AVAILABLE'}
                      </span>
                    </td>
                    <td>
                      {isOccupied && booking ? (
                        <div className="tbl-booking-info">
                          <strong>{booking.name}</strong>
                          <span>
                            {booking.batch || 'Class'} • {booking.start}-{booking.end}
                          </span>
                        </div>
                      ) : (
                        <span className="text-muted">Available Now</span>
                      )}
                    </td>
                    <td>
                      <div className="tbl-actions">
                        <button
                          type="button"
                          className="btn-tbl secondary"
                          onClick={() => onSelectRoom(room)}
                        >
                          View
                        </button>
                        {!isOccupied && onAllocateRoom && (
                          <button
                            type="button"
                            className="btn-tbl primary"
                            onClick={() => onAllocateRoom(room)}
                          >
                            Allocate
                          </button>
                        )}
                      </div>
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
