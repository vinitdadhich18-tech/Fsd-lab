import React, { useEffect, useState } from 'react'
import Sidebar from './components/Sidebar'
import TopNavbar from './components/TopNavbar'
import RoomDetailsModal from './components/RoomDetailsModal'
import DashboardView from './views/DashboardView'
import AvailabilityView from './views/AvailabilityView'
import ManagementView from './views/ManagementView'
import AllocateView from './views/AllocateView'
import ScheduleView from './views/ScheduleView'
import ReportsView from './views/ReportsView'
import SettingsView from './views/SettingsView'
import './App.css'

const initialDate = '2026-09-22'
const initialTime = '10:30'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [date, setDate] = useState(initialDate)
  const [time, setTime] = useState(initialTime)
  const [query, setQuery] = useState('')
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [darkMode, setDarkMode] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Modals & Navigation Pre-selections
  const [roomForModal, setRoomForModal] = useState(null)
  const [preselectedAllocateRoom, setPreselectedAllocateRoom] = useState(null)

  // Sync dark mode class on document body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove('light-mode')
    } else {
      document.body.classList.add('light-mode')
    }
  }, [darkMode])

  // Fetch Dashboard & Live Room Availability Data
  const fetchDashboardData = () => {
    setLoading(true)
    setError('')
    const params = new URLSearchParams({ date, time, query })
    fetch(`/api/dashboard?${params}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not load live room allocation data')
        return res.json()
      })
      .then(setDashboard)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchDashboardData()
  }, [date, time, query])

  const setNow = () => {
    const now = new Date()
    setDate(now.toISOString().slice(0, 10))
    setTime(now.toTimeString().slice(0, 5))
  }

  const handleOpenRoomModal = (room) => {
    setRoomForModal(room)
  }

  const handleAllocateRoomClick = (room) => {
    setPreselectedAllocateRoom(room)
    setActiveTab('allocate')
  }

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content Layout */}
      <div className="main-content-layout">
        <TopNavbar
          query={query}
          setQuery={setQuery}
          date={date}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="page-body">
          {error && (
            <div className="alert-banner error">
              {error}. Ensure backend is running with <code>npm run dev</code> or <code>npm run server</code>.
            </div>
          )}

          {activeTab === 'dashboard' && (
            <DashboardView
              dashboard={dashboard}
              loading={loading}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              setNow={setNow}
              onSelectRoom={handleOpenRoomModal}
              onAllocateRoom={handleAllocateRoomClick}
              onNavigateTab={setActiveTab}
            />
          )}

          {activeTab === 'availability' && (
            <AvailabilityView
              dashboard={dashboard}
              loading={loading}
              date={date}
              setDate={setDate}
              time={time}
              setTime={setTime}
              onSelectRoom={handleOpenRoomModal}
              onAllocateRoom={handleAllocateRoomClick}
            />
          )}

          {activeTab === 'management' && (
            <ManagementView onSelectRoom={handleOpenRoomModal} />
          )}

          {activeTab === 'allocate' && (
            <AllocateView
              preselectedRoom={preselectedAllocateRoom}
              date={date}
              onAllocationSuccess={() => {
                fetchDashboardData()
              }}
            />
          )}

          {activeTab === 'schedule' && (
            <ScheduleView date={date} setDate={setDate} />
          )}

          {activeTab === 'reports' && <ReportsView />}

          {activeTab === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Room Details Side Modal */}
      {roomForModal && (
        <RoomDetailsModal
          room={roomForModal}
          date={date}
          onClose={() => setRoomForModal(null)}
          onAllocateRoom={handleAllocateRoomClick}
        />
      )}
    </div>
  )
}
