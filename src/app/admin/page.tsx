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
    fetchDevices()
    // fetchAccesses()
  }, [])
  
  useEffect(() => {
    if (devices.length > 0) {
      const firstDeviceId = devices[0]._id;
      fetchAccesses(firstDeviceId);
    }
  }, [devices]);

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
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">List Loker</h1>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {devices.map(device => (
          <LockerCard key={device.device_id} device={device} />
        ))}
      </div>
      <div>
        <div className="text-2xl font-semibold mb-2 mt-4">Tabel Aktifitas {devices[0]?.device_id}</div>
        <ProductTable items={accesses} />
      </div>
    </div>
  )
}
