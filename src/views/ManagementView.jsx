import React, { useState, useEffect } from 'react'
import {
  Building2,
  Plus,
  Trash2,
  Edit2,
  Eye,
  Search,
  Check,
  X,
  AlertCircle,
} from 'lucide-react'

export default function ManagementView({ onSelectRoom }) {
  const [rooms, setRooms] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingRoom, setEditingRoom] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    building: 'Academic Block A',
    floor: '1st Floor',
    capacity: 40,
    type: 'Classroom',
    equipment: ['Whiteboard', 'Wi-Fi'],
  })

  const availableEquipment = [
    'Projector',
    'Whiteboard',
    'Wi-Fi',
    'AC',
    'Smart Board',
    'Audio System',
    'Workstations',
    'Video Conferencing',
  ]

  const fetchRooms = () => {
    setLoading(true)
    fetch('/api/rooms')
      .then((res) => (res.ok ? res.json() : []))
      .then(setRooms)
      .catch(() => setRooms([]))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchRooms()
  }, [])

  const handleEquipmentToggle = (equip) => {
    setFormData((prev) => {
      const exists = prev.equipment.includes(equip)
      return {
        ...prev,
        equipment: exists
          ? prev.equipment.filter((item) => item !== equip)
          : [...prev.equipment, equip],
      }
    })
  }

  const handleSaveRoom = (e) => {
    e.preventDefault()
    setErrorMsg('')
    setSuccessMsg('')

    if (!formData.id || !formData.building || !formData.capacity) {
      setErrorMsg('Please fill in all required room fields.')
      return
    }

    const isEdit = !!editingRoom
    const url = isEdit
      ? `/api/rooms/${encodeURIComponent(editingRoom.id)}`
      : '/api/rooms'
    const method = isEdit ? 'PUT' : 'POST'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then(async (res) => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Failed to save room')
        return data
      })
      .then(() => {
        setSuccessMsg(
          isEdit ? `Room ${formData.id} updated successfully!` : `Room ${formData.id} added successfully!`
        )
        setShowAddModal(false)
        setEditingRoom(null)
        resetForm()
        fetchRooms()
      })
      .catch((err) => setErrorMsg(err.message))
  }

  const handleDeleteRoom = (roomId) => {
    if (!window.confirm(`Are you sure you want to delete Room ${roomId}?`)) return

    fetch(`/api/rooms/${encodeURIComponent(roomId)}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => {
        setSuccessMsg(`Room ${roomId} deleted successfully!`)
        fetchRooms()
      })
      .catch((err) => setErrorMsg(err.message))
  }

  const openEditModal = (room) => {
    setEditingRoom(room)
    setFormData({
      id: room.id,
      building: room.building,
      floor: room.floor || '1st Floor',
      capacity: room.capacity,
      type: room.type,
      equipment: room.equipment || [],
    })
    setShowAddModal(true)
  }

  const resetForm = () => {
    setFormData({
      id: '',
      building: 'Academic Block A',
      floor: '1st Floor',
      capacity: 40,
      type: 'Classroom',
      equipment: ['Whiteboard', 'Wi-Fi'],
    })
  }

  const filteredRooms = rooms.filter((r) => {
    if (!searchQuery) return true
    const q = searchQuery.toLowerCase()
    return (
      r.id.toLowerCase().includes(q) ||
      r.building.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q)
    )
  })

  return (
    <div className="view-container">
      {/* Header */}
      <div className="view-header-flex">
        <div>
          <h1>ROOM MANAGEMENT</h1>
          <p>Campus Infrastructure & Room Specifications Inventory</p>
        </div>
        <button
          type="button"
          className="btn-primary"
          onClick={() => {
            setEditingRoom(null)
            resetForm()
            setShowAddModal(true)
          }}
        >
          <Plus size={18} /> Add New Room
        </button>
      </div>

      {/* Banners */}
      {successMsg && <div className="alert-banner success">{successMsg}</div>}
      {errorMsg && <div className="alert-banner error">{errorMsg}</div>}

      {/* Filter & Search */}
      <div className="filters-control-panel">
        <div className="search-filter-box">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search room number, building, or type..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="summary-count-badge">
          Total Infrastructure: <strong>{rooms.length} Rooms</strong>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div className="loading-state-box">Loading campus rooms database...</div>
      ) : (
        <div className="table-responsive-wrapper">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Building Block</th>
                <th>Floor</th>
                <th>Room Type</th>
                <th>Capacity</th>
                <th>Installed Facilities</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td>
                    <strong className="room-id-chip">{room.id}</strong>
                  </td>
                  <td>{room.building}</td>
                  <td>{room.floor}</td>
                  <td>
                    <span className="type-pill">{room.type}</span>
                  </td>
                  <td>
                    <strong>{room.capacity}</strong> Seats
                  </td>
                  <td>
                    <div className="tbl-equip-tags">
                      {room.equipment.slice(0, 3).map((eq, idx) => (
                        <span key={idx} className="equip-mini-tag">
                          {eq}
                        </span>
                      ))}
                      {room.equipment.length > 3 && (
                        <span className="equip-more-tag">
                          +{room.equipment.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="tbl-actions">
                      <button
                        type="button"
                        className="btn-icon-action"
                        onClick={() => onSelectRoom(room)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon-action text-indigo"
                        onClick={() => openEditModal(room)}
                        title="Edit Room"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        type="button"
                        className="btn-icon-action text-rose"
                        onClick={() => handleDeleteRoom(room.id)}
                        title="Delete Room"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Room Modal */}
      {showAddModal && (
        <div className="modal-backdrop" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingRoom ? `Edit Room ${editingRoom.id}` : 'Add New Campus Room'}</h2>
              <button
                type="button"
                className="close-modal-btn"
                onClick={() => setShowAddModal(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveRoom}>
              <div className="modal-body">
                <div className="form-grid-2">
                  <div className="form-group">
                    <label>Room Number / ID *</label>
                    <input
                      type="text"
                      placeholder="e.g. A-104 or ST-203"
                      value={formData.id}
                      disabled={!!editingRoom}
                      onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Building Block *</label>
                    <select
                      value={formData.building}
                      onChange={(e) => setFormData({ ...formData, building: e.target.value })}
                    >
                      <option value="Academic Block A">Academic Block A</option>
                      <option value="Academic Block B">Academic Block B</option>
                      <option value="Science & Tech Building">Science & Tech Building</option>
                      <option value="Innovation Centre">Innovation Centre</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Floor Level *</label>
                    <select
                      value={formData.floor}
                      onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    >
                      <option value="Ground Floor">Ground Floor</option>
                      <option value="1st Floor">1st Floor</option>
                      <option value="2nd Floor">2nd Floor</option>
                      <option value="3rd Floor">3rd Floor</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Room Type *</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    >
                      <option value="Classroom">Classroom</option>
                      <option value="Lecture Hall">Lecture Hall</option>
                      <option value="Computer Lab">Computer Lab</option>
                      <option value="Laboratory">Laboratory</option>
                      <option value="Seminar Hall">Seminar Hall</option>
                      <option value="Conference Room">Conference Room</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Seating Capacity *</label>
                    <input
                      type="number"
                      min="5"
                      max="500"
                      value={formData.capacity}
                      onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group mt-4">
                  <label>Equipment & Facilities Available</label>
                  <div className="checkbox-grid">
                    {availableEquipment.map((eq) => {
                      const isChecked = formData.equipment.includes(eq)
                      return (
                        <label key={eq} className={`checkbox-chip ${isChecked ? 'checked' : ''}`}>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleEquipmentToggle(eq)}
                          />
                          <span>{eq}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingRoom ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
