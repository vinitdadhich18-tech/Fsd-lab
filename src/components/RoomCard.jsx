import React from 'react'
import {
  Users,
  MapPin,
  Clock,
  BookOpen,
  User,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react'

export default function RoomCard({ room, onSelectRoom, onAllocateRoom }) {
  const isOccupied = room.status === 'occupied'
  const booking = room.booking
  const nextBooking = room.nextBooking

  return (
    <article className={`room-card-v2 ${isOccupied ? 'status-occupied' : 'status-available'}`}>
      {/* Top Header */}
      <div className="card-top-bar">
        <div className="room-identity">
          <span className="room-number-tag">{room.id}</span>
          <span className="room-type-badge">{room.type}</span>
        </div>
        <div className={`status-pill ${isOccupied ? 'occupied' : 'available'}`}>
          <span className="pulse-dot" />
          {isOccupied ? 'OCCUPIED' : 'AVAILABLE NOW'}
        </div>
      </div>

      {/* Building & Capacity info */}
      <div className="card-location-row">
        <span className="location-info">
          <MapPin size={14} />
          {room.building} • {room.floor}
        </span>
        <span className="capacity-info">
          <Users size={14} />
          Cap: <strong>{room.capacity}</strong>
        </span>
      </div>

      {/* Dynamic Content Section */}
      <div className="card-body-content">
        {isOccupied && booking ? (
          <div className="occupied-details-box">
            <div className="detail-line primary-line">
              <BookOpen size={14} className="detail-icon" />
              <div>
                <span className="detail-label">Subject</span>
                <strong className="detail-value">{booking.name}</strong>
              </div>
            </div>
            <div className="detail-meta-grid">
              <div className="detail-line">
                <Users size={13} className="detail-icon" />
                <div>
                  <span className="detail-label">Allocated To</span>
                  <span className="detail-value">{booking.batch || 'Batch N/A'}</span>
                </div>
              </div>
              <div className="detail-line">
                <User size={13} className="detail-icon" />
                <div>
                  <span className="detail-label">Faculty</span>
                  <span className="detail-value">{booking.instructor}</span>
                </div>
              </div>
            </div>
            <div className="time-range-badge">
              <Clock size={13} />
              <span>
                Time: <strong>{booking.start} – {booking.end}</strong>
              </span>
            </div>
          </div>
        ) : (
          <div className="available-details-box">
            <div className="available-hero-text">
              <CheckCircle2 size={16} className="text-emerald" />
              <span>Ready for immediate allocation</span>
            </div>
            {nextBooking ? (
              <div className="upcoming-booking-notice">
                <AlertCircle size={13} className="text-amber" />
                <span>
                  Next Booking: <strong>{nextBooking.start}</strong> ({nextBooking.name})
                </span>
              </div>
            ) : (
              <div className="equipment-tags-list">
                {room.equipment.slice(0, 3).map((item, idx) => (
                  <span key={idx} className="equip-tag">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Action Buttons */}
      <div className="card-footer-actions">
        <button
          type="button"
          className="btn-card-action secondary"
          onClick={() => onSelectRoom(room)}
        >
          View Details
        </button>

        {!isOccupied && onAllocateRoom && (
          <button
            type="button"
            className="btn-card-action primary"
            onClick={() => onAllocateRoom(room)}
          >
            Allocate Room
            <ArrowRight size={14} />
          </button>
        )}
      </div>
    </article>
  )
}
