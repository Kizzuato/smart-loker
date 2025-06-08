'use client'
import { useState } from 'react';
import { FiSun, FiMoon, FiGrid, FiList, FiSearch, FiX, FiChevronLeft, FiChevronRight, FiCheck, FiEdit2, FiEye, FiTrash2, FiPlus } from 'react-icons/fi';

interface User {
    _id: string;
    name: string;
    email: string;
}
interface AccessLog {
    _id: string;
    user_id?: User;
    fingerprint_id: number;
    device_id: string;
    access_time: Date;
    status: 'success' | 'failed';
    remarks?: string;
}

interface Props {
    items: AccessLog[]
}

export default function ProductTable({ items }: Props) {
    const [darkMode, setDarkMode] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<AccessLog | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Sample item data

    // Filter items based on search and category
    const filteredProducts = items.filter(item => {
        const matchesSearch = item.user_id?.name.toLowerCase().includes(searchQuery.toLowerCase());
        // const matchesCategory = !selectedCategory || item.category === selectedCategory;
        return matchesSearch;
    });

    // Get unique categories
    const categories = [...new Set(items.map(item => item.status))];

    return (
        <div className="grid grid-cols-1 gap-6 mb-6">
            <div
                className="bg-white border border-gray-200 shadow-md shadow-black/5 p-6 rounded-md"
            >
                <div className="flex justify-between mb-4 items-start">
                    <div className="font-medium">Pickup List</div>
                    <div className="dropdown">
                        <button
                            type="button"
                            className="dropdown-toggle text-gray-400 hover:text-gray-600"
                        >
                            <i className="ri-more-fill"></i>
                        </button>
                        <ul
                            className="dropdown-menu shadow-md shadow-black/5 z-30 hidden py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]"
                        >
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                >Profile</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                >Settings</a
                                >
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-blue-500 hover:bg-gray-50"
                                >Logout</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
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
                                <th
                                    className="text-[12px] uppercase tracking-wide font-medium text-gray-400 py-2 px-4 bg-gray-50 text-left rounded-tr-md rounded-br-md"
                                >
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((items) => (
                                <tr key={items._id}>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <div className="flex items-center">
                                            <a
                                                href="#"
                                                className="text-gray-600 text-sm font-medium hover:text-blue-500 ml-2 truncate"
                                            >{items.device_id}</a
                                            >
                                        </div>
                                    </td>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <span className="text-[13px] font-medium text-emerald-500"
                                        >3 Kg</span
                                        >
                                    </td>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <span
                                            className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none"
                                        >Done</span
                                        >
                                    </td>
                                    <td className="py-2 px-2 border-b border-b-gray-50">
                                        <span
                                            className="inline-block p-1 rounded bg-emerald-500/10 text-emerald-500 font-medium text-[12px] leading-none"
                                        >Done</span
                                        >
                                    </td>
                                    <td className="py-2 px-4 border-b border-b-gray-50">
                                        <button
                                            type="button"
                                            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-small rounded-md text-xs px-3 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                        >
                                            Details
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