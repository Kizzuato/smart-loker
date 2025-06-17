'use client'

import UserTable from "@/app/components/tableUser"
import { useEffect, useState } from 'react'

interface User {
  _id: string;
  name: string;
  email: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users')
        const data = await res.json()
        if (data.success) {
          setUsers(data.data)
        }
      } catch (err) {
        console.error('Failed to fetch devices:', err)
      }
    }
    fetchUsers();
  })
  return (
    <>
      <h1 className="text-2xl font-bold mb-4">User list</h1>
      <div className="flex justify-between"></div>
      <UserTable usersById={users}>

      </UserTable>
    </>
  )
}
