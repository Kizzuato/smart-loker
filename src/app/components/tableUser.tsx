"use client";

import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import Swal from 'sweetalert2'

interface User {
  _id: string;
  name: string;
  email: string;
  phone_number?: number;
  role?: string;
  is_active?: boolean;
  registered_at?: string;
  fingerprint_id?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Device {
  _id: string;
  device_id: string;
  location?: string;
  status: 'kosong' | 'terisi' | 'nonaktif';
  mode: 'access' | 'register';
  last_seen?: Date;
}

interface FingerprintSlot {
  id: number;
  used: boolean;
}

export default function UserTable({
  usersById,
  device,
}: {
  usersById: User[];
  device: String;
}) {

  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slots, setSlots] = useState<FingerprintSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/users');
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
          console.log(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch users:', err);
      }
    };

    fetchUsers();
  }, []);


  useEffect(() => {
    setItems(usersById); // ambil data usersById dari props
  }, [usersById]);

  const openModal = async () => {
    try {
      handleEnroll();
      setIsModalOpen(true);
    } catch (err) {
      console.error("Failed to open modal:", err);
    }
  };

  const addUser = async () => {
    try {
      await fetch(`/api/users/${selectedUser}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ device_id: device, fingerprint_id: selectedSlot })
      });
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  const handleEnroll = async () => {
    try {
      await fetch("/api/enroll-mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enroll_mode: true, slot_id: selectedSlot })
      });
    } catch (err) {
      console.error("Enrollment failed:", err);
    }
  };

  const cancelEnroll = async () => {
    try {
      await fetch("/api/enroll-mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enroll_mode: false })
      });
    } catch (err) {
      console.error("Gagal menonaktifkan enroll mode:", err);
    }
  };


  return (
    <div className="grid grid-cols-1 gap-6">
      <div className="bg-white border border-gray-200 shadow-md shadow-black/5 p-6 pt-4 rounded-md">
        <div className="flex justify-end items-center mb-4">
          <button
            className="flex items-center gap-2 text-sm bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white"
            onClick={openModal}
          >
            <FiPlus /> Tambah User
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[460px]">
            <thead>
              <tr>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">Nama</th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Email</th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Fingerprint ID</th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Role</th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">Aktif</th>
                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {usersById?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-4">
                    Data tidak tersedia
                  </td>
                </tr>
              ) : (

                usersById?.map((user) => (
                  <tr key={user._id}>
                    <td className="py-2 px-2 border-b border-b-gray-50">
                      <span className="text-gray-600 text-sm font-medium">{user.name}</span>
                    </td>
                    <td className="py-2 px-2 border-b border-b-gray-50">
                      <span className="text-[13px] font-medium text-blue-500">{user.email}</span>
                    </td>
                    <td className="py-2 px-2 border-b border-b-gray-50 ">
                      <span className="inline-block p-1 rounded text-black-500 font-medium text-[12px]">{user.fingerprint_id || '-'}</span>
                    </td>
                    <td className="py-2 px-2 border-b border-b-gray-50">
                      <span className="inline-block p-1 rounded bg-black-500/10 text-black-500 font-medium text-[12px]">{user.role || '-'}</span>
                    </td>
                    <td className="py-2 px-2 border-b border-b-gray-50">
                      <span className={`inline-block p-1 rounded text-[12px] font-medium leading-none ${user.is_active ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'}`}>{user.is_active ? 'Aktif' : 'Nonaktif'}</span>
                    </td>
                    <td className="flex gap-2 text-center py-2">
                      <button className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white text-sm py-1 px-2 border border-blue-500 hover:border-transparent rounded">Detail</button>
                      <button className="bg-transparent hover:bg-red-500 text-red-700 hover:text-white text-sm py-1 px-2 border border-red-500 hover:border-transparent rounded"
                      // onClick={}
                      >Hapus</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-lg font-semibold mb-4">Tambah Pengguna untuk</h2>

            <div className="mb-4">
              <label className="block text-sm mb-1">Slot Fingerprint</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedSlot || ''}
                onChange={(e) => setSelectedSlot(Number(e.target.value))}
              >
                <option value="">Pilih Slot</option>
                {Array.from({ length: 127 }, (_, i) => i + 1).map((num) => (
                  <option key={num} value={num}>Slot {num}</option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Pilih Pengguna</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Pilih User</option>
                {users.map((user) => (
                  <option key={user._id} value={user._id}>{user.name}</option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  cancelEnroll();
                }}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={addUser}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
