'use client'

import { Menu, User } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { signOut } from 'next-auth/react';

interface Props {
  onToggle: () => void
}

export default function Navbar({ onToggle }: Props) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const router = useRouter();

  const handleLogout = async () => {
  const result = await Swal.fire({
    title: "Anda Yakin?",
    text: "Anda akan keluar",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Ya",
    cancelButtonText: "Tidak"
  });

  if (result.isConfirmed) {
    // Panggil API logout
    // await fetch('/api/logout', {
    //   method: 'POST',
    // });

    // Tampilkan notifikasi berhasil logout
    await Swal.fire({
      title: "Keluar",
      text: "Anda berhasil keluar",
      icon: "success"
    });

    // Redirect ke halaman login (atau halaman utama)
     signOut({ callbackUrl: '/' }); 
  }
  }


  // Close dropdown when clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="w-full bg-blue-600 text-white px-4 py-3 flex items-center justify-between relative">
      <button onClick={onToggle} className="md:hidden">
        <Menu size={24} />
      </button>

      <h1 className="text-xl font-bold">Admin Panel</h1>

      {/* Right menu */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 hover:opacity-80"
        >
          <User size={24} />
          <span className="hidden md:inline">Admin</span>
        </button>

        {/* Dropdown */}
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
            <a href="/admin/profile" className="block px-4 py-2 hover:bg-gray-100">
              Profile
            </a>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
