"use client";

import { useState } from "react";

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
    items: AccessLog[];
}

export default function ProductTable({ items }: Props) {
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter
    const filtered = items.filter(item =>
        item.user_id?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Pagination logic
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const currentData = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="grid grid-cols-1 gap-6">
            <div className="bg-white border border-gray-200 shadow-md p-4 rounded-md">

                <div className="overflow-x-auto">
                    <div className="mb-5 flex justify-between items-center text-gray-400 p-2 bg-white rounded-md">
                        <input
                            type="text"
                            placeholder="Cari nama..."
                            value={searchQuery}
                            onChange={e => {
                                setSearchQuery(e.target.value);
                                setCurrentPage(1); // reset ke halaman 1 saat search
                            }}
                            className="border px-3 py-1 rounded-md text-sm"
                        />

                        <div className="space-x-2">
                            <button
                                disabled={currentPage <= 1}
                                onClick={() => setCurrentPage(prev => prev - 1)}
                                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                            >
                                ← Prev
                            </button>
                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage(prev => prev + 1)}
                                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
                            >
                                Next →
                            </button>
                            <span className="text-sm">Hal. {currentPage} dari {totalPages}</span>
                        </div>
                    </div>
                    <table className="w-full min-w-[460px]">
                        <thead>
                            <tr>
                                <th className="text-xs font-medium text-gray-400 px-4 py-2 bg-gray-50 text-left">Device</th>
                                <th className="text-xs font-medium text-gray-400 px-4 py-2 bg-gray-50 text-left">User</th>
                                <th className="text-xs font-medium text-gray-400 px-4 py-2 bg-gray-50 text-left">Waktu Akses</th>
                                <th className="text-xs font-medium text-gray-400 px-4 py-2 bg-gray-50 text-left">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="text-center py-4 text-sm text-gray-500">
                                        Tidak ada data
                                    </td>
                                </tr>
                            ) : (
                                currentData.map((item) => (
                                    <tr key={item._id}>
                                        <td className="py-2 px-4 text-xs">{item.device_id.device_id}</td>
                                        <td className="py-2 px-4 text-xs text-blue-500">{item.user_id?.name || 'Tidak Diketahui'}</td>
                                        <td className="py-2 px-4 text-xs">
                                            {item.access_time
                                                ? new Date(item.access_time).toLocaleString('id-ID', {
                                                    dateStyle: 'short',
                                                    timeStyle: 'short',
                                                })
                                                : 'Waktu tidak diketahui'}
                                        </td>
                                        <td className="py-2 px-4">
                                            <span className={`inline-block px-2 py-1 text-xs rounded ${item.status === 'success'
                                                ? 'bg-blue-100 text-blue-600'
                                                : 'bg-red-100 text-red-600'}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
