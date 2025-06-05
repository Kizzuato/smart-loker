'use client'

import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';

const SignUpPage: NextPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            console.log('Sign up data:', { name, email, password });
            // Handle successful sign up (e.g., redirect)
        } catch (err) {
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <Head>
                <title>Sign Up | Your App</title>
                <meta name="description" content="Create a new account" />
            </Head>

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Link href="/">
                    <div className="flex justify-center cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
                            Y
                        </div>
                    </div>
                </Link>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Create a new account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md mx-6">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {error && (
                        <div className="mb-4 rounded-md bg-red-50 p-4">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiUser className="text-gray-400" />
                                </div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 border-transparent"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiMail className="text-gray-400" />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 pl-10 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 border-transparent"
                                    placeholder="your@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <FiLock className="text-gray-400" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pl-10 pr-10 rounded-lg bg-gray-100 border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200 border-transparent"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                >
                                    {showPassword ? (
                                        <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                                    ) : (
                                        <FiEye className="text-gray-400 hover:text-gray-600" />
                                    )}
                                </button>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                Use 8 or more characters with a mix of letters, numbers & symbols
                            </p>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ${loading && 'opacity-70 cursor-not-allowed'
                                    }`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating account...</span>
                                    </div>
                                ) : (
                                    'Sign up'
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Or sign up with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-red-500 text-white font-medium hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                <span className="sr-only">Sign up with Google</span>
                                G
                            </button>
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-blue-600 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                <span className="sr-only">Sign up with Facebook</span>
                                f
                            </button>
                            <button
                                type="button"
                                className="w-full inline-flex justify-center py-2 px-4 rounded-md shadow-sm bg-gray-800 text-white font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                <span className="sr-only">Sign up with GitHub</span>
                                G
                            </button>
                        </div>
                    </div>

                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link
                                href="/auth/signin"
                                className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;