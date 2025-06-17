'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { IoMdSettings } from 'react-icons/io'

interface Device {
  _id: string; // <--- tambahkan _id (biar bisa passing id ke parent)
  device_id: string;
  location?: string;
  status: 'kosong' | 'terisi' | 'nonaktif';
  mode: 'access' | 'register';
  last_seen?: Date;
}

const statusColor = {
  kosong: 'bg-green-500',
  terisi: 'bg-yellow-500',
  nonaktif: 'bg-red-500',
}

interface Props {
  device: Device;
  // onSelect: (deviceId: string, mode: 'access' | 'user') => void;
}

export default function LockerCard({ device }: Props) {
  const [showOptions, setShowOptions] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const handleSettingsClick = () => {
    setIsSpinning(true)
    setShowOptions((prev) => !prev)
    setTimeout(() => setIsSpinning(false), 500)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowOptions(false)
      }
    }

    if (showOptions) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showOptions])

  const handleSelect = (mode: 'access' | 'user') => {
    setShowOptions(false);
  }

  return (
    <div className="relative">
      <div className="flex justify-between mb-2 bg-white shadow-sm p-5 rounded-sm">
        <div>
          <div className="text-2xl font-semibold">{device.device_id}</div>
          <div className="text-sm text-gray-400">{device.status}</div>
        </div>
        <div className="flex flex-col justify-between p-1 items-end">
          <div className={`w-4 h-4 rounded-full ${statusColor[device.status]}`} />
          <button onClick={handleSettingsClick}>
            <IoMdSettings
              className={`w-4 h-4 cursor-pointer transition-transform duration-100 ${isSpinning ? 'animate-spin' : ''
                }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            ref={popupRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute end-0 top-25 bg-white shadow-md z-10"
          >
            <button 
              onClick={() => handleSelect('access')} 
              className="block w-full text-left px-4 py-2 hover:bg-blue-100 hover:text-blue-500"
            >
              Aktif
            </button>
            <button 
              onClick={() => handleSelect('user')} 
              className="block w-full text-left px-4 py-2 hover:bg-red-100 hover:text-red-500"
            >
              Nonaktif
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
