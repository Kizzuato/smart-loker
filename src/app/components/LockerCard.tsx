'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Locker } from '@/lib/dummyLockers'
import { IoMdSettings } from "react-icons/io";

interface Props {
  locker: Locker
}

const statusColor = {
  kosong: 'bg-green-500',
  terisi: 'bg-yellow-500',
  nonaktif: 'bg-red-500',
}

export default function LockerCard({ locker }: Props) {

  const [showOptions, setShowOptions] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const handleSettingsClick = () => {
    setIsSpinning(true)
    setShowOptions(prev => !prev)
    setTimeout(() => setIsSpinning(false), 500) // stop spinning after 1 second
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

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showOptions])

  return (
    <>
      <div className="relative">
        <div className="flex justify-between mb-6 bg-white shadow-sm p-5 rounded-sm">
          <div>
            <div className="flex justify-between">
              <div className="text-2xl font-semibold">{locker.label}</div>
            </div>
            <div className="flex justify-between items-center text-sm font-medium text-gray-400">
              {locker.status}
            </div>
          </div>
          <div className="flex flex-col justify-between p-1 items-end">
            <div className={`w-4 h-4 rounded-full ${statusColor[locker.status]}`} />
            <button onClick={handleSettingsClick}>
              <IoMdSettings
                className={`w-4 h-4  cursor-pointer transition-transform duration-100 ${isSpinning ? 'animate-spin' : ''}`}
              />
            </button>
          </div>
        </div>

        {/* Opsi dropdown */}
        <AnimatePresence>
          {showOptions && (
            <motion.div
              ref={popupRef}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute end-0 top-24 bg-white rounded shadow-md p-2 z-10"
            >
              <button className="block w-full text-left px-2 py-1 rounded-sm hover:bg-gray-100">Aktivitas</button>
              <button className="block w-full text-left px-2 py-1 rounded-sm hover:bg-gray-100">Pengguna</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
