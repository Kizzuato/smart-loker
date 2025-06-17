'use client'

import { useEffect, useState } from 'react'
import LockerCard from '../components/LockerCard'
import { dummyLockers } from '@/lib/dummyLockers'
import ProductTable from '../components/tableAktifitas'
import UserTable from '../components/tableUser' // <-- asumsi kamu punya komponen table user

interface Device {
  _id: string;
  device_id: string;
  location?: string;
  status: 'kosong' | 'terisi' | 'nonaktif';
  mode: 'access' | 'register';
  last_seen?: Date;
}

interface User {
  _id: string;
  name: string;
  email: string;
}
interface AccessLog {
  _id: string;
  user_id?: User;
  fingerprint_id: number;
  device_id: Device;
  access_time: Date;
  status: 'success' | 'failed';
  remarks?: string;
}

export default function AdminDashboard() {
  const [devices, setDevices] = useState<Device[]>([])
  const [accesses, setAccesses] = useState<AccessLog[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [selectedDeviceId, setSelectedDeviceId] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'access' | 'user'>('access')

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetch('/api/devices')
        const data = await res.json()
        if (data.success) {
          setDevices(data.data)
          if (data.data.length > 0) {
            setSelectedDeviceId(data.data[0]._id)
          }
        }
      } catch (err) {
        console.error('Failed to fetch devices:', err)
      }
    }
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        if (data.success) {
          setUsers(data.data)
        }
      } catch (err) {
        console.error('Failed to fetch devices:', err)
      }
    }
    fetchUsers()    
    fetchDevices()
  }, [])

  useEffect(() => {
    if (!selectedDeviceId) return;

    if (viewMode === 'access') {
      fetchAccesses(selectedDeviceId)
    } else {
      fetchUsersByDevice(selectedDeviceId)
    }
  }, [selectedDeviceId, viewMode])

  const fetchAccesses = async (id: string) => {
    try {
      const res = await fetch(`/api/accesses/${id}`);
      const data = await res.json()
      if (data.success) {
        setAccesses(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch Accesses:', err)
    }
  }

  const fetchUsersByDevice = async (id: string) => {
    try {
      const res = await fetch(`/api/users/bydevice/${id}`);
      const data = await res.json()
      if (data.success) {
        setUsers(data.data)
      }
    } catch (err) {
      console.error('Failed to fetch Users:', err)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">List Loker</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {devices.map(device => (
          <LockerCard
            key={device.device_id}
            device={device}
            // onClick={() => setSelectedDeviceId(device._id)} 
          />
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <h2 className="text-2xl font-semibold">
          {viewMode === 'access' ? 'Tabel Aktifitas' : 'Tabel Pengguna'} {devices.find(d => d._id === selectedDeviceId)?.device_id}
        </h2>
        <div className="space-x-2">
          <button
            className={`px-4 py-2 rounded ${viewMode === 'access' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setViewMode('access')}
          >
            Aktifitas
          </button>
          <button
            className={`px-4 py-2 rounded ${viewMode === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setViewMode('user')}
          >
            Pengguna
          </button>
        </div>
      </div>

      <div className="mt-4">
        {viewMode === 'access' ? (
          <ProductTable items={accesses} />
        ) : (
          <UserTable  usersById={users} device={devices[0]._id}/>
        )}
      </div>
    </div>
  )
}
