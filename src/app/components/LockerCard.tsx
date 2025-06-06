'use client'

import { Locker } from '@/lib/dummyLockers'

interface Props {
  locker: Locker
}

const statusColor = {
  kosong: 'bg-green-500',
  terisi: 'bg-yellow-500',
  nonaktif: 'bg-red-500',
}

export default function LockerCard({ locker }: Props) {
  return (
    <>
      <div className="flex justify-between mb-6 bg-white shadow-sm p-5 rounded-sm">
        <div>
          <div className="flex justify-between">
            <div className="text-2xl font-semibold">{locker.label}</div>
          </div>
          <div className="text-sm font-medium text-gray-400">
            {locker.status}
          </div>
        </div>
        <div className={`w-4 h-4 rounded-full ${statusColor[locker.status]} mb-2`} />
      </div >
    </>
  )
}
