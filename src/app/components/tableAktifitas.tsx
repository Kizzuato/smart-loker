'use client'
import { useState } from 'react';
import { FiSun, FiMoon, FiGrid, FiList, FiSearch, FiX, FiChevronLeft, FiChevronRight, FiCheck, FiEdit2, FiEye, FiTrash2, FiPlus } from 'react-icons/fi';

interface Device {
    _id: string;
    device_id: string;
    location?: string;
    status: 'kosong' | 'terisi' | 'nonaktif';
    mode: 'access' | 'register';
    last_seen?: Date;
}

interface User {
    _id: string;
    name: string;
    email: string;
}
interface AccessLog {
    _id: string;
    user_id?: User;
    fingerprint_id: number;
    device_id: Device;
    access_time: Date;
    status: 'success' | 'failed';
    remarks?: string;
}

interface Props {
    items: AccessLog[]
}

export default function ActivityTable({ items }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    // Filter items based on search and category
    const filteredProducts = items?.filter(item => {
        const matchesSearch = item.user_id?.name.toLowerCase().includes(searchQuery.toLowerCase());
        // const matchesCategory = !selectedCategory || item.category === selectedCategory;
        return matchesSearch;
    });

    // Get unique categories
    const categories = [...new Set(items?.map(item => item.status))];

    return (
        <div className="grid grid-cols-1 gap-6 ">
            <div className="bg-white border border-gray-200 shadow-md shadow-black/5 p-6 rounded-md">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[460px]">
                        <thead>
                            <tr>
                                <th
                                    className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tl-md rounded-bl-md"
                                >
                                    Device
                                </th>
                                <th
                                    className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left"
                                >
                                    User
                                </th>
                                <th
                                    className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md"
                                >
                                    Waktu akses
                                </th>
                                <th
                                    className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md"
                                >
                                    Status
                                </th>
                                {/* <th
                                    className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md"
                                >
                                    Aksi
                                </th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {items?.map((item) => (
                                <tr key={item._id}>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <span
                                                className="text-gray-600 text-sm font-medium ml-2"
                                            >{item.device_id?.device_id}</span
                                            >
                                        </div>
                                    </td>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <span className="text-[13px] font-medium text-blue-500"
                                            >{item.user_id?.name || 'Tidak Diketahui'}</span
                                            >
                                        </div>
                                    </td>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <span
                                                className="inline-block p-1 rounded bg-blue-500/10 text-blue-500 font-medium text-[12px] leading-none"
                                            >{item.access_time ? new Date(item.access_time).toLocaleString('id-ID', {
                                                dateStyle: 'short',
                                                timeStyle: 'short'
                                            }) : 'Waktu tidak diketahui'}

                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <span className={`inline-block p-1 rounded text-[12px] font-medium leading-none ${item.status === 'success'
                                                ? 'bg-blue-500/10 text-blue-500'
                                                : 'bg-red-500/10 text-red-500'
                                                }`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </td>
                                    {/* <td className="py-2 px-4 border-b border-b-gray-50">
                                        <button
                                            type="button"
                                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-small rounded-md text-xs px-3 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Details
                                        </button>
                                    </td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}