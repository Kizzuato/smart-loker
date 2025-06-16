'use client'
import { useEffect, useState } from 'react'
import { FiSun, FiMoon, FiGrid, FiList, FiSearch, FiX, FiChevronLeft, FiChevronRight, FiCheck, FiEdit2, FiEye, FiTrash2, FiPlus } from 'react-icons/fi';

interface User {
    _id: string;
    name: string;
    email: string;
    phone_number?: number;
    role?: string;
    is_active?: boolean;
    registered_at?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default function UserTable() {
    const [searchQuery, setSearchQuery] = useState('');
    const [items, setItems] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('/api/users');
                const data = await res.json();
                if (data.success) {
                    setItems(data.data);
                    console.log(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch users:', err);
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="grid grid-cols-1 gap-6">
            <div className="bg-white border border-gray-200 shadow-md shadow-black/5 p-6 rounded-md">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[460px]">
                        <thead>
                            <tr>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md">
                                    Nama
                                </th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                                    Email
                                </th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left">
                                    Role
                                </th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                                    Aktif
                                </th>
                                <th className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item._id}>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <span className="text-gray-600 text-sm font-medium">{item.name}</span>
                                    </td>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-blue-500">{item.email}</span>
                                    </td>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <span className="inline-block p-1 rounded bg-blue-500/10 text-blue-500 font-medium text-[12px]">
                                            {item.role || '-'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <span className={`inline-block p-1 rounded text-[12px] font-medium leading-none ${item.is_active ? 'bg-blue-500/10 text-blue-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {item.is_active ? 'Aktif' : 'Nonaktif'}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white text-sm py-1 px-2 border border-blue-500 hover:border-transparent rounded">
                                            Detail
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
