import React, { useEffect, useState } from 'react'
import {
  X,
  Building,
  Users,
  Layers,
  Wrench,
  Clock,
  Calendar,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  BookOpen,
} from 'lucide-react'

export default function RoomDetailsModal({ room, date, onClose, onAllocateRoom }) {
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!room) return
    setLoading(true)
    fetch(`/api/allocations?date=${date}&roomId=${room.id}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setSchedule(data)
      })
      .catch(() => setSchedule([]))
      .finally(() => setLoading(false))
  }, [room, date])

  if (!room) return null

  // Generate hourly schedule breakdown from 08:00 to 18:00
  const hours = [
    '08:00', '09:00', '10:00', '11:00', '12:00',
    '13:00', '14:00', '15:00', '16:00', '17:00'
  ]

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog room-details-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-eyebrow">ROOM PROFILE</span>
            <h2>ROOM {room.id}</h2>
            <p>{room.building} • {room.floor}</p>
          </div>
          <button type="button" className="close-modal-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Quick Specifications */}
          <div className="specs-grid">
            <div className="spec-card">
              <Building className="spec-icon text-indigo" size={20} />
              <div>
                <span className="spec-label">Room Type</span>
                <strong className="spec-val">{room.type}</strong>
              </div>
            </div>

            <div className="spec-card">
              <Users className="spec-icon text-emerald" size={20} />
              <div>
                <span className="spec-label">Seating Capacity</span>
                <strong className="spec-val">{room.capacity} Seats</strong>
              </div>
            </div>

            <div className="spec-card">
              <Layers className="spec-icon text-amber" size={20} />
              <div>
                <span className="spec-label">Location Floor</span>
                <strong className="spec-val">{room.floor}</strong>
              </div>
            </div>
          </div>

          {/* Installed Facilities / Equipment */}
          <div className="facilities-section">
            <h4>
              <Wrench size={16} /> Installed Facilities & Equipment
            </h4>
            <div className="equipment-chips-wrapper">
              {room.equipment && room.equipment.length > 0 ? (
                room.equipment.map((item, i) => (
                  <span key={i} className="facility-chip">
                    <CheckCircle size={14} className="chip-check" />
                    {item}
                  </span>
                ))
              ) : (
                <span className="text-muted">Standard furniture installed</span>
              )}
            </div>
          </div>

          {/* Today's Hourly Schedule */}
          <div className="schedule-timeline-section">
            <div className="section-head-flex">
              <h4>
                <Calendar size={16} /> Today's Time Slot Schedule ({date})
              </h4>
              <span className="count-pill">{schedule.length} Bookings</span>
            </div>

            {loading ? (
              <div className="loading-spinner-box">Loading schedule...</div>
            ) : (
              <div className="timeline-grid">
                {hours.map((h, index) => {
                  const nextH = hours[index + 1] || '18:00'
                  // Check if any booking overlaps with slot [h, nextH]
                  const booking = schedule.find(
                    (b) => b.start <= h && b.end > h
                  )

                  return (
                    <div
                      key={h}
                      className={`timeline-slot ${booking ? 'slot-occupied' : 'slot-available'}`}
                    >
                      <div className="slot-time-col">
                        <Clock size={12} />
                        <span>{h} - {nextH}</span>
                      </div>

                      <div className="slot-content-col">
                        {booking ? (
                          <div className="slot-booking-info">
                            <strong className="slot-title">{booking.name}</strong>
                            <span className="slot-sub">
                              {booking.batch || 'Batch'} • {booking.instructor} ({booking.start}–{booking.end})
                            </span>
                          </div>
                        ) : (
                          <span className="slot-free-label">Available for Booking</span>
                        )}
                      </div>

                      <div className="slot-status-indicator">
                        {booking ? (
                          <span className="badge-booked">Occupied</span>
                        ) : (
                          <span className="badge-free">Free</span>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              onClose()
              onAllocateRoom(room)
            }}
          >
            <PlusCircle size={16} /> Allocate Room Now
          </button>
        </div>
      </div>
    </div>
  )
}
