import { createServer } from 'node:http'
import { URL } from 'node:url'

// Initial seed data: Realistic College Rooms
let rooms = [
  // Academic Block A
  { id: 'A-101', building: 'Academic Block A', floor: '1st Floor', capacity: 60, type: 'Lecture Hall', equipment: ['Projector', 'Whiteboard', 'Wi-Fi', 'Audio System', 'AC'] },
  { id: 'A-102', building: 'Academic Block A', floor: '1st Floor', capacity: 45, type: 'Classroom', equipment: ['Whiteboard', 'Wi-Fi', 'AC'] },
  { id: 'A-103', building: 'Academic Block A', floor: '1st Floor', capacity: 50, type: 'Classroom', equipment: ['Projector', 'Whiteboard', 'Wi-Fi'] },
  { id: 'A-201', building: 'Academic Block A', floor: '2nd Floor', capacity: 35, type: 'Computer Lab', equipment: ['35 High-End PCs', 'Projector', 'AC', 'Wi-Fi', 'LAN'] },
  { id: 'A-202', building: 'Academic Block A', floor: '2nd Floor', capacity: 30, type: 'Computer Lab', equipment: ['30 Workstations', 'Smart Board', 'AC', 'Wi-Fi'] },
  { id: 'A-301', building: 'Academic Block A', floor: '3rd Floor', capacity: 120, type: 'Seminar Hall', equipment: ['Stage Podium', 'Dual Projectors', 'Surround Sound', 'AC', 'Wi-Fi'] },
  { id: 'A-302', building: 'Academic Block A', floor: '3rd Floor', capacity: 20, type: 'Conference Room', equipment: ['Video Conferencing', 'Smart Display', 'AC', 'Wi-Fi'] },

  // Academic Block B
  { id: 'B-101', building: 'Academic Block B', floor: '1st Floor', capacity: 55, type: 'Classroom', equipment: ['Projector', 'Whiteboard', 'Wi-Fi'] },
  { id: 'B-102', building: 'Academic Block B', floor: '1st Floor', capacity: 40, type: 'Classroom', equipment: ['Whiteboard', 'Wi-Fi', 'AC'] },
  { id: 'B-201', building: 'Academic Block B', floor: '2nd Floor', capacity: 30, type: 'Laboratory', equipment: ['Digital Storage Oscilloscopes', 'Breadboards', 'Function Generators', 'AC'] },
  { id: 'B-202', building: 'Academic Block B', floor: '2nd Floor', capacity: 25, type: 'Laboratory', equipment: ['VLSI Workstations', 'FPGA Kits', 'Smart Board', 'AC'] },
  { id: 'B-301', building: 'Academic Block B', floor: '3rd Floor', capacity: 150, type: 'Auditorium', equipment: ['Dolby Sound System', 'Motorized Screen', 'Stage Lighting', 'AC'] },
  { id: 'B-302', building: 'Academic Block B', floor: '3rd Floor', capacity: 18, type: 'Conference Room', equipment: ['Executive Table', 'Display Screen', 'VC Camera'] },

  // Science & Tech Building
  { id: 'ST-101', building: 'Science & Tech Building', floor: '1st Floor', capacity: 40, type: 'Laboratory', equipment: ['Physics Apparatus', 'Optics Benches', 'AC', 'Whiteboard'] },
  { id: 'ST-102', building: 'Science & Tech Building', floor: '1st Floor', capacity: 35, type: 'Laboratory', equipment: ['Chemical Fume Hoods', 'Safety Shower', 'AC', 'Whiteboard'] },
  { id: 'ST-201', building: 'Science & Tech Building', floor: '2nd Floor', capacity: 30, type: 'Computer Lab', equipment: ['NVIDIA GPU Workstations', 'Smart Board', 'AC', 'High-Speed LAN'] },
  { id: 'ST-202', building: 'Science & Tech Building', floor: '2nd Floor', capacity: 25, type: 'Laboratory', equipment: ['Robotic Arm Kits', '3D Printer', 'AC', 'Wi-Fi'] },
  { id: 'ST-301', building: 'Science & Tech Building', floor: '3rd Floor', capacity: 80, type: 'Lecture Hall', equipment: ['Dual Screen Projectors', 'Mic System', 'AC', 'Wi-Fi'] },

  // Innovation Centre
  { id: 'IC-001', building: 'Innovation Centre', floor: 'Ground Floor', capacity: 25, type: 'Seminar Hall', equipment: ['Modular Seating', 'Interactive Touch Board', 'AC'] },
  { id: 'IC-002', building: 'Innovation Centre', floor: 'Ground Floor', capacity: 16, type: 'Conference Room', equipment: ['4K Conference Display', 'Polycom Mic System', 'AC'] },
  { id: 'IC-101', building: 'Innovation Centre', floor: '1st Floor', capacity: 35, type: 'Computer Lab', equipment: ['Mac Studio Units', 'Design Tablets', 'AC', 'Wi-Fi'] },
  { id: 'IC-102', building: 'Innovation Centre', floor: '1st Floor', capacity: 40, type: 'Classroom', equipment: ['Smart Whiteboard', 'Projector', 'AC'] },
  { id: 'IC-201', building: 'Innovation Centre', floor: '2nd Floor', capacity: 20, type: 'Meeting Room', equipment: ['Whiteboard Wall', 'TV Display', 'Wi-Fi', 'Coffee Bar'] },
]

// Initial seed data: Realistic Course Allocations
let classes = [
  // Today's Allocations (2026-09-22)
  { id: 1, name: 'Data Structures & Algorithms', code: 'CS-301', roomId: 'A-101', date: '2026-09-22', start: '09:00', end: '11:00', instructor: 'Dr. Rajesh Sharma', enrolled: 58, capacity: 60, batch: 'CSE-3A', purpose: 'Regular Lecture' },
  { id: 2, name: 'Database Management Systems', code: 'CS-402', roomId: 'A-102', date: '2026-09-22', start: '10:00', end: '12:00', instructor: 'Prof. Ananya Verma', enrolled: 45, capacity: 45, batch: 'CSE-3B', purpose: 'Regular Lecture' },
  { id: 3, name: 'Full-Stack Web Development', code: 'FSD-201', roomId: 'A-201', date: '2026-09-22', start: '10:00', end: '13:00', instructor: 'Ms. Meera Kapoor', enrolled: 34, capacity: 35, batch: 'IT-3B', purpose: 'Practical Lab' },
  { id: 4, name: 'Software Engineering', code: 'SE-303', roomId: 'B-101', date: '2026-09-22', start: '12:00', end: '14:00', instructor: 'Dr. Vikram Singh', enrolled: 52, capacity: 55, batch: 'CSE-4A', purpose: 'Regular Lecture' },
  { id: 5, name: 'Artificial Intelligence & ML', code: 'AI-401', roomId: 'ST-201', date: '2026-09-22', start: '09:30', end: '11:30', instructor: 'Dr. Sunita Rao', enrolled: 30, capacity: 30, batch: 'AI-1A', purpose: 'Practical Lab' },
  { id: 6, name: 'Digital Circuit Analysis', code: 'EC-202', roomId: 'B-201', date: '2026-09-22', start: '11:00', end: '13:00', instructor: 'Prof. Amit Patel', enrolled: 28, capacity: 30, batch: 'ECE-2A', purpose: 'Practical Lab' },
  { id: 7, name: 'Operating Systems', code: 'CS-302', roomId: 'A-103', date: '2026-09-22', start: '14:00', end: '16:00', instructor: 'Dr. Rajesh Sharma', enrolled: 48, capacity: 50, batch: 'CSE-3A', purpose: 'Regular Lecture' },
  { id: 8, name: 'Physics Laboratory', code: 'PH-101', roomId: 'ST-101', date: '2026-09-22', start: '14:00', end: '17:00', instructor: 'Prof. Kabir Mehta', enrolled: 38, capacity: 40, batch: 'ME-1A', purpose: 'Practical Lab' },
  { id: 9, name: 'Campus Placement Orientation', code: 'TPO-100', roomId: 'B-301', date: '2026-09-22', start: '15:00', end: '17:30', instructor: 'T&P Cell Panel', enrolled: 140, capacity: 150, batch: 'All Final Year', purpose: 'Seminar / Workshop' },
  { id: 10, name: 'Incubation Project Review', code: 'INC-901', roomId: 'IC-002', date: '2026-09-22', start: '15:00', end: '16:30', instructor: 'Deans Panel', enrolled: 14, capacity: 16, batch: 'Startup Batches', purpose: 'Review Meeting' },

  // Upcoming Days Allocations (2026-09-23)
  { id: 11, name: 'Computer Networks', code: 'CS-403', roomId: 'A-101', date: '2026-09-23', start: '09:00', end: '11:00', instructor: 'Prof. Ananya Verma', enrolled: 58, capacity: 60, batch: 'CSE-3B', purpose: 'Regular Lecture' },
  { id: 12, name: 'Cloud Computing Architecture', code: 'IT-501', roomId: 'ST-201', date: '2026-09-23', start: '10:00', end: '12:00', instructor: 'Dr. Sunita Rao', enrolled: 29, capacity: 30, batch: 'IT-4A', purpose: 'Practical Lab' },
  { id: 13, name: 'Robotics & Automation Lab', code: 'ROB-301', roomId: 'ST-202', date: '2026-09-23', start: '14:00', end: '16:30', instructor: 'Dr. Vikram Singh', enrolled: 22, capacity: 25, batch: 'ME-4A', purpose: 'Practical Lab' },
  { id: 14, name: 'Cyber Security & Forensics', code: 'CS-504', roomId: 'A-202', date: '2026-09-23', start: '11:00', end: '13:00', instructor: 'Ms. Meera Kapoor', enrolled: 28, capacity: 30, batch: 'CSE-4B', purpose: 'Practical Lab' },
  { id: 15, name: 'Faculty Executive Senate', code: 'ADM-001', roomId: 'A-302', date: '2026-09-23', start: '16:00', end: '18:00', instructor: 'Director Office', enrolled: 18, capacity: 20, batch: 'Faculty', purpose: 'Senate Meeting' },
]

function isActive(classItem, date, time) {
  return classItem.date === date && classItem.start <= time && time < classItem.end
}

function timeToMinutes(tStr) {
  if (!tStr) return 0
  const [h, m] = tStr.split(':').map(Number)
  return h * 60 + m
}

function checkTimeConflict(date, roomId, start, end, excludeId = null) {
  const reqStart = timeToMinutes(start)
  const reqEnd = timeToMinutes(end)

  return classes.filter((c) => {
    if (excludeId && c.id === excludeId) return false
    if (c.date !== date || c.roomId !== roomId) return false
    const existingStart = timeToMinutes(c.start)
    const existingEnd = timeToMinutes(c.end)
    return reqStart < existingEnd && reqEnd > existingStart
  })
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = ''
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch (err) {
        reject(err)
      }
    })
  })
}

function json(response, status, payload) {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  })
  response.end(JSON.stringify(payload))
}

function getDashboard(searchParams) {
  const date = searchParams.get('date') || '2026-09-22'
  const time = searchParams.get('time') || '10:30'
  const query = (searchParams.get('query') || '').trim().toLowerCase()
  const building = searchParams.get('building') || 'All'
  const roomType = searchParams.get('type') || 'All'

  // Get active classes at specified date + time
  const activeClasses = classes.filter((classItem) => isActive(classItem, date, time))
  
  // Today's total allocations
  const todayAllocations = classes.filter((c) => c.date === date)

  const allRooms = rooms.map((room) => {
    const booking = activeClasses.find((classItem) => classItem.roomId === room.id)
    
    // Find next upcoming booking today after selected time
    const upcomingToday = classes
      .filter((c) => c.roomId === room.id && c.date === date && c.start > time)
      .sort((a, b) => a.start.localeCompare(b.start))[0] || null

    return {
      ...room,
      status: booking ? 'occupied' : 'available',
      booking: booking || null,
      nextBooking: upcomingToday || null,
    }
  })

  // Filter rooms
  const roomResults = allRooms.filter((room) => {
    if (building !== 'All' && room.building !== building) return false
    if (roomType !== 'All' && room.type !== roomType) return false
    if (!query) return true
    const searchable = [
      room.id,
      room.building,
      room.floor,
      room.type,
      ...room.equipment,
      room.booking?.name,
      room.booking?.instructor,
      room.booking?.batch,
    ].join(' ').toLowerCase()
    return searchable.includes(query)
  })

  const fullClasses = activeClasses.filter((classItem) => classItem.enrolled >= classItem.capacity)

  return {
    date,
    time,
    rooms: roomResults,
    activeClasses,
    fullClasses,
    totals: {
      rooms: rooms.length,
      available: allRooms.filter((room) => room.status === 'available').length,
      occupied: allRooms.filter((room) => room.status === 'occupied').length,
      activeClasses: activeClasses.length,
      fullClasses: fullClasses.length,
      todayAllocations: todayAllocations.length,
    },
  }
}

function getReports() {
  const buildingStats = {}
  rooms.forEach((r) => {
    if (!buildingStats[r.building]) {
      buildingStats[r.building] = { totalRooms: 0, totalCapacity: 0 }
    }
    buildingStats[r.building].totalRooms += 1
    buildingStats[r.building].totalCapacity += r.capacity
  })

  const typeStats = {}
  rooms.forEach((r) => {
    typeStats[r.type] = (typeStats[r.type] || 0) + 1
  })

  const dateAllocations = {}
  classes.forEach((c) => {
    dateAllocations[c.date] = (dateAllocations[c.date] || 0) + 1
  })

  return {
    totalRooms: rooms.length,
    totalAllocations: classes.length,
    buildingStats,
    typeStats,
    dateAllocations,
  }
}

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url, 'http://localhost:4000')
  const pathname = requestUrl.pathname

  if (request.method === 'OPTIONS') {
    json(response, 200, { ok: true })
    return
  }

  try {
    // GET /api/health
    if (pathname === '/api/health') {
      json(response, 200, { ok: true, timestamp: new Date().toISOString() })
      return
    }

    // GET /api/dashboard
    if (pathname === '/api/dashboard') {
      json(response, 200, getDashboard(requestUrl.searchParams))
      return
    }

    // GET & POST /api/rooms
    if (pathname === '/api/rooms') {
      if (request.method === 'GET') {
        json(response, 200, rooms)
        return
      }
      if (request.method === 'POST') {
        const data = await parseRequestBody(request)
        if (!data.id || !data.building || !data.type || !data.capacity) {
          json(response, 400, { error: 'Missing required room fields (id, building, type, capacity).' })
          return
        }
        if (rooms.some((r) => r.id.toLowerCase() === data.id.toLowerCase())) {
          json(response, 400, { error: `Room ID ${data.id} already exists.` })
          return
        }
        const newRoom = {
          id: data.id,
          building: data.building,
          floor: data.floor || '1st Floor',
          capacity: Number(data.capacity),
          type: data.type,
          equipment: Array.isArray(data.equipment) ? data.equipment : ['Whiteboard', 'Wi-Fi'],
        }
        rooms.push(newRoom)
        json(response, 201, newRoom)
        return
      }
    }

    // DELETE /api/rooms/:id & PUT /api/rooms/:id
    if (pathname.startsWith('/api/rooms/')) {
      const roomId = decodeURIComponent(pathname.replace('/api/rooms/', ''))
      const roomIndex = rooms.findIndex((r) => r.id === roomId)

      if (roomIndex === -1) {
        json(response, 404, { error: `Room ${roomId} not found.` })
        return
      }

      if (request.method === 'DELETE') {
        const deleted = rooms.splice(roomIndex, 1)[0]
        // also remove associated allocations
        classes = classes.filter((c) => c.roomId !== roomId)
        json(response, 200, { success: true, deleted })
        return
      }

      if (request.method === 'PUT') {
        const data = await parseRequestBody(request)
        rooms[roomIndex] = {
          ...rooms[roomIndex],
          building: data.building || rooms[roomIndex].building,
          floor: data.floor || rooms[roomIndex].floor,
          capacity: data.capacity ? Number(data.capacity) : rooms[roomIndex].capacity,
          type: data.type || rooms[roomIndex].type,
          equipment: data.equipment || rooms[roomIndex].equipment,
        }
        json(response, 200, rooms[roomIndex])
        return
      }
    }

    // GET & POST /api/allocations
    if (pathname === '/api/allocations') {
      if (request.method === 'GET') {
        const dateFilter = requestUrl.searchParams.get('date')
        const roomIdFilter = requestUrl.searchParams.get('roomId')
        let result = [...classes]
        if (dateFilter) result = result.filter((c) => c.date === dateFilter)
        if (roomIdFilter) result = result.filter((c) => c.roomId === roomIdFilter)
        json(response, 200, result)
        return
      }

      if (request.method === 'POST') {
        const data = await parseRequestBody(request)
        const { roomId, date, start, end, name, code, instructor, batch, purpose, enrolled } = data

        if (!roomId || !date || !start || !end || !name) {
          json(response, 400, { error: 'Missing required allocation fields (roomId, date, start, end, name).' })
          return
        }

        const roomObj = rooms.find((r) => r.id === roomId)
        if (!roomObj) {
          json(response, 404, { error: `Selected Room ${roomId} does not exist.` })
          return
        }

        // Real-time Conflict Check
        const conflicts = checkTimeConflict(date, roomId, start, end)
        if (conflicts.length > 0) {
          const conflicting = conflicts[0]
          // Suggest alternative available rooms for this slot
          const availableAlternatives = rooms.filter((r) => {
            const rConflicts = checkTimeConflict(date, r.id, start, end)
            return rConflicts.length === 0
          })

          json(response, 409, {
            error: `Room ${roomId} is already allocated from ${conflicting.start} to ${conflicting.end} for "${conflicting.name}" (${conflicting.batch || 'Class'}).`,
            conflict: conflicting,
            suggestedRooms: availableAlternatives.map((r) => ({ id: r.id, building: r.building, capacity: r.capacity, type: r.type })),
          })
          return
        }

        const newAllocation = {
          id: Date.now(),
          name,
          code: code || 'COURSE-101',
          roomId,
          date,
          start,
          end,
          instructor: instructor || 'Faculty Member',
          enrolled: Number(enrolled) || Math.floor(roomObj.capacity * 0.8),
          capacity: roomObj.capacity,
          batch: batch || 'General Batch',
          purpose: purpose || 'Regular Lecture',
        }

        classes.push(newAllocation)
        json(response, 201, newAllocation)
        return
      }
    }

    // DELETE /api/allocations/:id
    if (pathname.startsWith('/api/allocations/')) {
      const allocId = Number(pathname.replace('/api/allocations/', ''))
      const idx = classes.findIndex((c) => c.id === allocId)

      if (idx === -1) {
        json(response, 404, { error: 'Allocation not found.' })
        return
      }

      if (request.method === 'DELETE') {
        const deleted = classes.splice(idx, 1)[0]
        json(response, 200, { success: true, deleted })
        return
      }
    }

    // GET /api/reports
    if (pathname === '/api/reports') {
      json(response, 200, getReports())
      return
    }

    json(response, 404, { error: 'Route not found' })
  } catch (err) {
    console.error('Server error:', err)
    json(response, 500, { error: 'Internal Server Error', details: err.message })
  }
})

server.listen(4000, () => {
  console.log('ROOMFLOW Backend running at http://localhost:4000')
})
