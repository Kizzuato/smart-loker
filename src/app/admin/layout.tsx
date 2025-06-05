'use client'
import Navbar from '../components/adminNavbar'
import Sidebar from '../components/adminSidebar'
import { ReactNode, useState } from 'react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen">
      <Sidebar open={open} />
      <div className="flex-1 md:ml-64">
        <Navbar onToggle={() => setOpen(!open)} />
        <main className="p-4">{children}</main>
      </div>
    </div>
  )
}
