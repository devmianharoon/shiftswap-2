'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { AppDispatch, IRootState } from '@/store';
import { loginUser } from '@/store/AuthSlice';
import { fetchUser } from '@/store/UserSlice';
import { jwtDecode } from 'jwt-decode';
import { decodeJWT, isTokenExpired } from '@/data/lib/token';

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const { loading, error, user } = useSelector((state: IRootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser({ email, password })).unwrap();
            console.log('Login successful:', result);
            const token_decode = decodeJWT(result.token);
            console.log('Decoded JWT:', token_decode);
            if (typeof token_decode?.sub === 'string') {
                const result2 = await dispatch(fetchUser(token_decode.sub)).unwrap();
            } else {
                throw new Error('Invalid token: subject (sub) is missing.');
            }
            // isTokenExpired(result.token);
            console.log('Is token expired:', isTokenExpired(result.token));
            Cookies.set('current_user_tt', JSON.stringify(result), { expires: 7, secure: true, sameSite: 'strict' });
            router.push('/dashboard/users/profile');
        } catch (err) {
            console.error('Login failed:', err);
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Sticky Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-sm">
                <div className="text-2xl font-bold text-gray-800">
                    <Link href={'/'}>Sift Swap</Link>
                </div>
                <div className="flex gap-3">
                    <Link href={'/signin'} className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 hover:border-gray-400 transition-all duration-200">
                        Login
                    </Link>
                    <Link href={'/signup'} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                        SignUp
                    </Link>
                </div>
            </header>

            {/* Main Content with Split Background */}
            <main className="flex-1 flex flex-col">
                {/* Top Half - Gradient Background */}
                <div className="bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100 flex flex-col items-center justify-center px-4 py-12 min-h-[50vh]">
                    {/* Page Title */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">Sign In</h1>
                        <div className="flex items-center justify-center text-sm text-gray-600">
                            <Link href="/" className="hover:text-blue-600 transition-colors">
                                Home
                            </Link>
                            <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                            <span>Sign In</span>
                        </div>
                    </div>

                    {/* Sign In Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                            <p className="text-gray-600">Fill your email and password to sign in.</p>
                        </div>

                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Username or Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                            />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {loading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <Link href="/forgot-password" className="text-blue-600 hover:underline text-sm transition-all duration-200">
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="text-center mt-4 text-sm text-gray-600">
                            {"Don't have an account? "}
                            <Link href="/signup" className="text-blue-600 hover:underline transition-all duration-200">
                                Sign up
                            </Link>
                        </div>

                        <div className="mt-6">
                            <div className="text-center text-gray-500 text-sm mb-4">or</div>
                            <div className="flex justify-center gap-4">
                                <button className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 hover:shadow-lg transform hover:scale-110 transition-all duration-200">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700 hover:shadow-lg transform hover:scale-110 transition-all duration-200">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </button>
                                <button className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 hover:shadow-lg transform hover:scale-110 transition-all duration-200">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Half - White Background */}
                <div className="bg-white flex-1 min-h-[50vh]">
                    {/* Footer with White Background */}
                    <footer className="bg-white text-gray-800 px-6 py-12 border-t border-gray-200">
                        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                            {/* Logo and Copyright */}
                            <div>
                                <div className="text-2xl font-bold mb-4 text-gray-800">Sandbox</div>
                                <p className="text-gray-600 text-sm mb-2">© 2025 Sandbox.</p>
                                <p className="text-gray-600 text-sm">All rights reserved.</p>
                                <div className="flex gap-3 mt-4">
                                    <button className="text-gray-600 hover:text-gray-800 hover:scale-110 transition-all duration-200">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-600 hover:text-gray-800 hover:scale-110 transition-all duration-200">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-600 hover:text-gray-800 hover:scale-110 transition-all duration-200">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001 12.017.001z" />
                                        </svg>
                                    </button>
                                    <button className="text-gray-600 hover:text-gray-800 hover:scale-110 transition-all duration-200">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Get in Touch */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Get in Touch</h3>
                                <div className="space-y-2 text-gray-600 text-sm">
                                    <p>Moonshine St. 14/05</p>
                                    <p>Light City, London,</p>
                                    <p>United Kingdom</p>
                                    <p className="mt-4">info@email.com</p>
                                    <p>00 (123) 456 78 90</p>
                                </div>
                            </div>

                            {/* Learn More */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Learn More</h3>
                                <div className="space-y-2">
                                    <Link href="/about" className="block text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200">
                                        About Us
                                    </Link>
                                    <Link href="/story" className="block text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200">
                                        Our Story
                                    </Link>
                                    <Link href="/projects" className="block text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200">
                                        Projects
                                    </Link>
                                    <Link href="/terms" className="block text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200">
                                        Terms of Use
                                    </Link>
                                    <Link href="/privacy" className="block text-gray-600 hover:text-gray-800 text-sm transition-colors duration-200">
                                        Privacy Policy
                                    </Link>
                                </div>
                            </div>

                            {/* Newsletter */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4 text-gray-800">Our Newsletter</h3>
                                <p className="text-gray-600 text-sm mb-4">Subscribe to our newsletter to get our news & deals delivered to you.</p>
                                <div className="flex">
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="flex-1 px-4 py-2 bg-gray-100 border border-gray-300 text-gray-800 placeholder-gray-500 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                                    />
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-r-lg hover:shadow-lg transition-all duration-200">Submit</button>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>
        </div>
    );
}
