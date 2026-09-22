import React, { useState } from 'react'
import {
  Settings,
  Shield,
  Clock,
  Bell,
  Save,
  CheckCircle,
  Building2,
  Lock,
} from 'lucide-react'

export default function SettingsView() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    instituteName: 'Institute of Engineering & Technology',
    campusCode: 'IET-MAIN',
    startTime: '08:00',
    endTime: '18:00',
    defaultSlot: '2 Hours',
    conflictPrevention: true,
    emailAlerts: true,
    themeDefault: 'dark',
  })

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="view-container">
      {/* View Header */}
      <div className="view-header">
        <div>
          <h1>SYSTEM SETTINGS</h1>
          <p>ROOMFLOW System Configuration & Campus Operating Parameters</p>
        </div>
      </div>

      {saved && (
        <div className="alert-banner success">
          <CheckCircle size={18} />
          <span>System settings updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="settings-form">
        {/* Section 1: General Institute Settings */}
        <div className="settings-card">
          <div className="card-header-row">
            <h4>
              <Building2 size={18} className="text-indigo" /> Institute Infrastructure Settings
            </h4>
          </div>
          <div className="form-grid-2">
            <div className="form-group">
              <label>Institute / College Name</label>
              <input
                type="text"
                value={settings.instituteName}
                onChange={(e) => setSettings({ ...settings, instituteName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Campus Code</label>
              <input
                type="text"
                value={settings.campusCode}
                onChange={(e) => setSettings({ ...settings, campusCode: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Operating Hours & Slot Policy */}
        <div className="settings-card mt-6">
          <div className="card-header-row">
            <h4>
              <Clock size={18} className="text-emerald" /> Campus Operating Hours & Slot Policies
            </h4>
          </div>
          <div className="form-grid-3">
            <div className="form-group">
              <label>Campus Opening Time</label>
              <input
                type="time"
                value={settings.startTime}
                onChange={(e) => setSettings({ ...settings, startTime: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Campus Closing Time</label>
              <input
                type="time"
                value={settings.endTime}
                onChange={(e) => setSettings({ ...settings, endTime: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Default Slot Duration</label>
              <select
                value={settings.defaultSlot}
                onChange={(e) => setSettings({ ...settings, defaultSlot: e.target.value })}
              >
                <option value="1 Hour">1 Hour</option>
                <option value="2 Hours">2 Hours</option>
                <option value="3 Hours">3 Hours</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: System Rules & Alerts */}
        <div className="settings-card mt-6">
          <div className="card-header-row">
            <h4>
              <Shield size={18} className="text-amber" /> Real-Time Conflict Rules & Alerts
            </h4>
          </div>
          <div className="toggle-list">
            <div className="toggle-item">
              <div>
                <strong>Strict Real-Time Time Slot Conflict Prevention</strong>
                <p>Prevent double booking a room for overlapping start & end times.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.conflictPrevention}
                onChange={(e) => setSettings({ ...settings, conflictPrevention: e.target.checked })}
              />
            </div>

            <div className="toggle-item">
              <div>
                <strong>High Demand Capacity Notifications</strong>
                <p>Alert administrator when room occupancy exceeds 90%.</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => setSettings({ ...settings, emailAlerts: e.target.checked })}
              />
            </div>
          </div>
        </div>

        <div className="form-submit-row mt-6">
          <button type="submit" className="btn-primary-lg">
            <Save size={18} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  )
}
