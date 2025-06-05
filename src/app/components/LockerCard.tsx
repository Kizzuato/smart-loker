'use client'

import { Locker } from '@/lib/dummyLockers'

interface Props {
  locker: Locker
}

const statusColor = {
  kosong: 'bg-green-500',
  terisi: 'bg-yellow-500',
  rusak: 'bg-red-500',
}

export default function LockerCard({ locker }: Props) {
  return (
    <div className="p-4 rounded-xl shadow-lg bg-white flex flex-col items-center border">
      <div className={`w-4 h-4 rounded-full ${statusColor[locker.status]} mb-2`} />
      <h2 className="text-lg font-semibold">{locker.label}</h2>
      <p className="text-sm capitalize text-gray-500">{locker.status}</p>
    </div>
  )
}
