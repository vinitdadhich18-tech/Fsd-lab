import React, { useState, useEffect } from 'react'
import {
  Calendar,
  Clock,
  BookOpen,
  User,
  Users,
  Building,
  AlertTriangle,
  CheckCircle,
  PlusCircle,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

export default function AllocateView({ preselectedRoom, date: initialDate, onAllocationSuccess }) {
  const [rooms, setRooms] = useState([])
  const [loadingRooms, setLoadingRooms] = useState(true)

  // Allocation Form State
  const [formData, setFormData] = useState({
    roomId: preselectedRoom ? preselectedRoom.id : '',
    date: initialDate || '2026-09-22',
    start: '10:00',
    end: '12:00',
    name: 'Data Structures & Algorithms',
    code: 'CS-301',
    batch: 'CSE-3A',
    instructor: 'Dr. Rajesh Sharma',
    purpose: 'Regular Lecture',
    enrolled: 45,
  })

  // Conflict & Response State
  const [submitting, setSubmitting] = useState(false)
  const [conflictError, setConflictError] = useState(null)
  const [suggestedRooms, setSuggestedRooms] = useState([])
  const [successBanner, setSuccessBanner] = useState('')

  useEffect(() => {
    fetch('/api/rooms')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        setRooms(data)
        if (!formData.roomId && data.length > 0) {
          setFormData((prev) => ({ ...prev, roomId: data[0].id }))
        }
      })
      .catch(() => setRooms([]))
      .finally(() => setLoadingRooms(false))
  }, [])

  useEffect(() => {
    if (preselectedRoom) {
      setFormData((prev) => ({ ...prev, roomId: preselectedRoom.id }))
    }
  }, [preselectedRoom])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)
    setConflictError(null)
    setSuggestedRooms([])
    setSuccessBanner('')

    fetch('/api/allocations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const body = await res.json()
        if (res.status === 409) {
          // Conflict Detected
          setConflictError(body.error)
          setSuggestedRooms(body.suggestedRooms || [])
          return
        }
        if (!res.ok) {
          throw new Error(body.error || 'Failed to allocate room')
        }
        // Success
        setSuccessBanner(`Room ${formData.roomId} allocated successfully for ${formData.name}!`)
        if (onAllocationSuccess) onAllocationSuccess()
      })
      .catch((err) => {
        setConflictError(err.message)
      })
      .finally(() => setSubmitting(false))
  }

  const selectSuggestedRoom = (room) => {
    setFormData((prev) => ({ ...prev, roomId: room.id }))
    setConflictError(null)
    setSuggestedRooms([])
  }

  const selectedRoomObj = rooms.find((r) => r.id === formData.roomId)

  return (
    <div className="view-container">
      {/* View Header */}
      <div className="view-header">
        <div>
          <h1>ALLOCATE ROOM</h1>
          <p>Book & Schedule Campus Spaces with Automatic Real-Time Conflict Prevention</p>
        </div>
      </div>

      {/* Success Notification Banner */}
      {successBanner && (
        <div className="alert-banner success">
          <CheckCircle size={18} />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Real-Time Conflict Warning Box */}
      {conflictError && (
        <div className="conflict-alert-card">
          <div className="conflict-alert-header">
            <AlertTriangle className="conflict-icon text-rose" size={22} />
            <div>
              <h4>Room Allocation Conflict Detected</h4>
              <p>{conflictError}</p>
            </div>
          </div>

          {/* Suggested Alternative Available Rooms */}
          {suggestedRooms.length > 0 && (
            <div className="suggested-rooms-container">
              <h5>
                <Sparkles size={15} className="text-amber" /> Suggested Free Rooms for {formData.start}–{formData.end}:
              </h5>
              <div className="suggested-chips-grid">
                {suggestedRooms.slice(0, 5).map((room) => (
                  <button
                    key={room.id}
                    type="button"
                    className="suggested-room-btn"
                    onClick={() => selectSuggestedRoom(room)}
                  >
                    <strong className="room-btn-id">{room.id}</strong>
                    <span className="room-btn-sub">
                      {room.building} (Cap: {room.capacity})
                    </span>
                    <ArrowRight size={14} className="suggest-arrow" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Allocation Form */}
      <div className="allocate-form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-section-title">
            <Building size={18} /> 1. Select Space & Schedule Timing
          </div>

          <div className="form-grid-3">
            {/* Room Selection */}
            <div className="form-group">
              <label htmlFor="select-room">Select Room *</label>
              <select
                id="select-room"
                value={formData.roomId}
                onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                required
              >
                {rooms.map((r) => (
                  <option key={r.id} value={r.id}>
                    Room {r.id} — {r.building} ({r.type}, Cap: {r.capacity})
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="form-group">
              <label htmlFor="alloc-date">Allocation Date *</label>
              <input
                id="alloc-date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>

            {/* Start & End Time */}
            <div className="form-group-flex-2">
              <div className="form-group">
                <label htmlFor="alloc-start">Start Time *</label>
                <input
                  id="alloc-start"
                  type="time"
                  value={formData.start}
                  onChange={(e) => setFormData({ ...formData, start: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="alloc-end">End Time *</label>
                <input
                  id="alloc-end"
                  type="time"
                  value={formData.end}
                  onChange={(e) => setFormData({ ...formData, end: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Selected Room Metadata Quick View */}
          {selectedRoomObj && (
            <div className="room-preview-strip">
              <span>
                Selected: <strong>Room {selectedRoomObj.id}</strong> ({selectedRoomObj.building})
              </span>
              <span>
                Type: <strong>{selectedRoomObj.type}</strong>
              </span>
              <span>
                Max Capacity: <strong>{selectedRoomObj.capacity} Seats</strong>
              </span>
            </div>
          )}

          <div className="form-section-title mt-6">
            <BookOpen size={18} /> 2. Class, Subject & Faculty Details
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label htmlFor="subject-name">Subject / Event Title *</label>
              <input
                id="subject-name"
                type="text"
                placeholder="e.g. Data Structures & Algorithms"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="course-code">Course Code</label>
              <input
                id="course-code"
                type="text"
                placeholder="e.g. CS-301"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label htmlFor="batch-code">Class / Batch Code *</label>
              <input
                id="batch-code"
                type="text"
                placeholder="e.g. CSE-3A or IT-2B"
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="faculty-name">Faculty / Instructor *</label>
              <input
                id="faculty-name"
                type="text"
                placeholder="e.g. Dr. Rajesh Sharma"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="purpose">Allocation Purpose</label>
              <select
                id="purpose"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              >
                <option value="Regular Lecture">Regular Lecture</option>
                <option value="Practical Lab">Practical Lab</option>
                <option value="Exam / Quiz">Exam / Quiz</option>
                <option value="Seminar / Workshop">Seminar / Workshop</option>
                <option value="Faculty Meeting">Faculty Meeting</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="enrolled">Expected Students / Enrolled</label>
              <input
                id="enrolled"
                type="number"
                value={formData.enrolled}
                onChange={(e) => setFormData({ ...formData, enrolled: e.target.value })}
              />
            </div>
          </div>

          <div className="form-submit-row">
            <button type="submit" className="btn-primary-lg" disabled={submitting}>
              <PlusCircle size={20} />
              {submitting ? 'Checking Conflict & Allocating...' : 'ALLOCATE ROOM NOW'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
