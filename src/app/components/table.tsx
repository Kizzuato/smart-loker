'use client'
import { useState } from 'react';
import { FiSun, FiMoon, FiGrid, FiList, FiSearch, FiX, FiChevronLeft, FiChevronRight, FiCheck, FiEdit2, FiEye, FiTrash2, FiPlus } from 'react-icons/fi';

interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    description: string;
    price: number;
}

export default function ProductTable() {
    const [darkMode, setDarkMode] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Sample product data
    const products: Product[] = [
        { id: 1, name: 'Apple iMac 27"', category: 'PC', brand: 'Apple', description: 'What is a product description? A product description describes a product.', price: 2999 },
        { id: 2, name: 'Apple iMac 20"', category: 'PC', brand: 'Apple', description: 'What is a product description? A product description describes a product.', price: 1499 },
        { id: 3, name: 'Apple iPhone 14', category: 'Phone', brand: 'Apple', description: 'What is a product description? A product description describes a product.', price: 999 },
        { id: 4, name: 'Apple iPad Air', category: 'Tablet', brand: 'Apple', description: 'What is a product description? A product description describes a product.', price: 1199 },
        { id: 5, name: 'Xbox Series S', category: 'Gaming/Console', brand: 'Microsoft', description: 'What is a product description? A product description describes a product.', price: 299 },
        { id: 6, name: 'PlayStation 5', category: 'Gaming/Console', brand: 'Sony', description: 'What is a product description? A product description describes a product.', price: 799 },
    ];

    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !selectedCategory || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get unique categories
    const categories = [...new Set(products.map(product => product.category))];

    return (
        <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <section className="p-3 sm:p-5">
                <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
                    <div className={`relative shadow-md sm:rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>

                        {/* Table Header with Controls */}
                        <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                            <div className="w-full md:w-1/2">
                                <form className="flex items-center">
                                    <label htmlFor="simple-search" className="sr-only">Search</label>
                                    <div className="relative w-full">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <FiSearch className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                                        </div>
                                        <input
                                            type="text"
                                            id="simple-search"
                                            className={`block w-full pl-10 p-2 text-sm rounded-lg border focus:ring-primary-500 focus:border-primary-500 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500'
                                                    : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500'
                                                }`}
                                            placeholder="Search"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </form>
                            </div>

                            <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                                <button
                                    type="button"
                                    className="flex items-center justify-center text-black bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                                    onClick={() => setShowCreateModal(true)}
                                >
                                    <FiPlus className="h-3.5 w-3.5 mr-2" />
                                    Add product
                                </button>

                                <div className="flex items-center space-x-3 w-full md:w-auto">
                                    {/* <div className="hidden md:flex items-center space-x-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-md">
                                        <button
                                            onClick={() => setViewMode('grid')}
                                            className={`p-2 rounded ${viewMode === 'grid' ? (darkMode ? 'bg-gray-600' : 'bg-white shadow-sm') : ''}`}
                                            aria-label="Grid view"
                                        >
                                            <FiGrid className={viewMode === 'grid' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'} />
                                        </button>
                                        <button
                                            onClick={() => setViewMode('list')}
                                            className={`p-2 rounded ${viewMode === 'list' ? (darkMode ? 'bg-gray-600' : 'bg-white shadow-sm') : ''}`}
                                            aria-label="List view"
                                        >
                                            <FiList className={viewMode === 'list' ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-500 dark:text-gray-400'} />
                                        </button>
                                    </div> */}

                                    {/* <button
                                        onClick={() => setDarkMode(!darkMode)}
                                        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                        aria-label="Toggle dark mode"
                                    >
                                        {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                                    </button> */}
                                </div>
                            </div>
                        </div>

                        {/* Category Filters */}
                        <div className={`border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} py-4 overflow-x-auto`}>
                            {/* <div className="flex space-x-4 px-4">
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${!selectedCategory
                                            ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                        }`}
                                >
                                    All
                                </button>
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${selectedCategory === category
                                                ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div> */}
                        </div>

                        {/* Products Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className={`text-xs uppercase ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-50 text-gray-700'}`}>
                                    <tr>
                                        <th scope="col" className="px-4 py-4">Product name</th>
                                        <th scope="col" className="px-4 py-3">Category</th>
                                        <th scope="col" className="px-4 py-3">Brand</th>
                                        <th scope="col" className="px-4 py-3">Description</th>
                                        <th scope="col" className="px-4 py-3">Price</th>
                                        <th scope="col" className="px-4 py-3">
                                            <span className="sr-only">Actions</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredProducts.map((product) => (
                                        <tr key={product.id} className={`border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                                            <th scope="row" className={`px-4 py-3 font-medium whitespace-nowrap ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                                {product.name}
                                            </th>
                                            <td className="px-4 py-3">{product.category}</td>
                                            <td className="px-4 py-3">{product.brand}</td>
                                            <td className="px-4 py-3 max-w-[12rem] truncate">{product.description}</td>
                                            <td className="px-4 py-3">${product.price}</td>
                                            <td className="px-4 py-3 flex items-center justify-end">
                                                <button
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setShowViewModal(true);
                                                    }}
                                                    className="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                >
                                                    <FiEye className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setShowEditModal(true);
                                                    }}
                                                    className="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100 ml-2"
                                                >
                                                    <FiEdit2 className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedProduct(product);
                                                        setShowDeleteModal(true);
                                                    }}
                                                    className="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-red-500 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-red-400 ml-2"
                                                >
                                                    <FiTrash2 className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
                            <span className={`text-sm font-normal ${darkMode ? 'text-gray-400' : 'text-gray-500'
                                }`}>
                                Showing <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1-10</span> of <span className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>1000</span>
                            </span>
                            <ul className="inline-flex items-stretch -space-x-px">
                                <li>
                                    <button className="flex items-center justify-center h-full py-1.5 px-3 ml-0 rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <FiChevronLeft className="w-5 h-5" />
                                    </button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">1</button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">2</button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">...</button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-center text-sm py-2 px-3 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">100</button>
                                </li>
                                <li>
                                    <button className="flex items-center justify-center h-full py-1.5 px-3 leading-tight rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:text-white">
                                        <FiChevronRight className="w-5 h-5" />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </section>

            {/* Create Product Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`relative p-4 w-full max-w-2xl max-h-full rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex justify-between items-center pb-4 mb-4 border-b rounded-t dark:border-gray-600">
                            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                Add Product
                            </h3>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`}
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        <form>
                            <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="name" className={`block mb-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className={`border text-sm rounded-lg block w-full p-2.5 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500'
                                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500'
                                            }`}
                                        placeholder="Type product name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="brand" className={`block mb-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        id="brand"
                                        className={`border text-sm rounded-lg block w-full p-2.5 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500'
                                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500'
                                            }`}
                                        placeholder="Product brand"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="price" className={`block mb-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Price</label>
                                    <input
                                        type="number"
                                        name="price"
                                        id="price"
                                        className={`border text-sm rounded-lg block w-full p-2.5 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500'
                                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500'
                                            }`}
                                        placeholder="$2999"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category" className={`block mb-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Category</label>
                                    <select
                                        id="category"
                                        className={`border text-sm rounded-lg block w-full p-2.5 ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500'
                                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500'
                                            }`}
                                    >
                                        <option value="">Select category</option>
                                        <option value="TV">TV/Monitors</option>
                                        <option value="PC">PC</option>
                                        <option value="GA">Gaming/Console</option>
                                        <option value="PH">Phones</option>
                                    </select>
                                </div>
                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className={`block mb-2 text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Description</label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        className={`block p-2.5 w-full text-sm rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500'
                                                : 'bg-gray-50 border-gray-300 text-gray-900 focus:ring-primary-500 focus:border-primary-500'
                                            }`}
                                        placeholder="Write product description here"
                                    ></textarea>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                <FiPlus className="mr-1 -ml-1 w-6 h-6" />
                                Add new product
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* View Product Modal */}
            {showViewModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`relative p-4 w-full max-w-xl max-h-full rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <div className="flex justify-between mb-4 rounded-t">
                            <div className={`text-lg md:text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                <h3 className="font-semibold">{selectedProduct.name}</h3>
                                <p className="font-bold">${selectedProduct.price}</p>
                            </div>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className={`text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white`}
                            >
                                <FiX className="w-5 h-5" />
                            </button>
                        </div>
                        <dl>
                            <dt className={`mb-2 font-semibold leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}>Details</dt>
                            <dd className={`mb-4 font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {selectedProduct.description}
                            </dd>
                            <dt className={`mb-2 font-semibold leading-none ${darkMode ? 'text-white' : 'text-gray-900'}`}>Category</dt>
                            <dd className={`mb-4 font-light ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                                {selectedProduct.category}
                            </dd>
                        </dl>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-3 sm:space-x-4">
                                <button
                                    onClick={() => {
                                        setShowViewModal(false);
                                        setShowEditModal(true);
                                    }}
                                    className="text-white inline-flex items-center bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    <FiEdit2 className="mr-1 -ml-1 w-5 h-5" />
                                    Edit
                                </button>
                                <button
                                    className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    Preview
                                </button>
                            </div>
                            <button
                                onClick={() => {
                                    setShowViewModal(false);
                                    setShowDeleteModal(true);
                                }}
                                className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                                <FiTrash2 className="mr-1 -ml-1 w-5 h-5" />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className={`relative p-4 w-full max-w-md max-h-full text-center rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                        <button
                            onClick={() => setShowDeleteModal(false)}
                            className={`text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white`}
                        >
                            <FiX className="w-5 h-5" />
                        </button>
                        <FiTrash2 className={`w-11 h-11 mb-3.5 mx-auto ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <p className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                            Are you sure you want to delete "{selectedProduct.name}"?
                        </p>
                        <div className="flex justify-center items-center space-x-4">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                            >
                                No, cancel
                            </button>
                            <button
                                onClick={() => {
                                    // Handle delete logic here
                                    setShowDeleteModal(false);
                                }}
                                className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                            >
                                Yes, I'm sure
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}