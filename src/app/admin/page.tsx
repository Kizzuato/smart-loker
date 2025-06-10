'use client'

import { useEffect, useState } from 'react'
import LockerCard from '../components/LockerCard'
import { dummyLockers } from '@/lib/dummyLockers'
import ProductTable from '../components/table'

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

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const res = await fetch('/api/devices')
        const data = await res.json()
        if (data.success) {
          setDevices(data.data)
        }
      } catch (err) {
        console.error('Failed to fetch devices:', err)
      }
    }

    const fetchAccesses = async () => {
      try {
        const res = await fetch('/api/accesses')
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)

        const data = await res.json()
        if (data.success) {
          setAccesses(data.data)
        } else {
          console.error('API response was not successful:', data)
        }
      } catch (err) {
        console.error('Failed to fetch Accesses:', err)
      }
    }


    fetchDevices()
    fetchAccesses()
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">List Loker</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {devices.map(device => (
          <LockerCard key={device.device_id} device={device} />
        ))}
      </div>
      <div className="flex justify-between">
        <div className="text-2xl font-semibold mb-2 mt-2">Tabel Aktifitas Loker 1</div>
      </div>
      <div>
        <ProductTable items={accesses} />
      </div>
    </div>
  )
}
