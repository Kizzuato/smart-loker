'use client'

import { useEffect, useState } from 'react'
import LockerCard from '../components/LockerCard'
import { dummyLockers } from '@/lib/dummyLockers'
import ProductTable from '../components/table'

interface Device {
  device_id: string;
  location?: string;
  status: 'kosong' | 'terisi' | 'nonaktif';
  mode: 'access' | 'register';
  last_seen?: Date;
}

export default function AdminDashboard() {
  const [devices, setDevices] = useState<Device[]>([])

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
        <ProductTable>
        </ProductTable>
      </div>
    </div>
  )
}
