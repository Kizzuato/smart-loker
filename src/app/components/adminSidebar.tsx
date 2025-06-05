'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Props {
  open: boolean
}

const menu = [
  { label: 'Dashboard', href: '/admin' },
  { label: 'Monitoring Loker', href: '/admin/monitoring' },
  { label: 'Pengguna', href: '/admin/users' },
]

export default function Sidebar({ open }: Props) {
  const pathname = usePathname()

  return (
    <aside className={`bg-gray-800 text-white w-64 p-4 space-y-2 fixed h-full top-0 left-0 transform transition-transform duration-200 z-40
      ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <h2 className="text-xl font-semibold mb-4">Menu</h2>
      {menu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`block py-2 px-3 rounded hover:bg-gray-700 ${
            pathname === item.href ? 'bg-gray-700' : ''
          }`}
        >
          {item.label}
        </Link>
      ))}
    </aside>
  )
}
