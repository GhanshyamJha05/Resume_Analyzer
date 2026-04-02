import { LogOut } from 'lucide-react';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Navbar({ user }) {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        router.push('/login');
    };

    return (
        <div className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 border-b border-gray-200/50">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group cursor-pointer">
                    <div className="w-8 h-8 bg-gray-900 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-black transition-colors">
                        RA
                    </div>
                    <h1 className="text-lg font-semibold text-gray-900 tracking-tight">ResumeAnalyzer</h1>
                </Link>

                <div className="flex items-center gap-5">
                    {user ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden sm:flex flex-col items-end justify-center">
                                <span className="text-sm font-medium text-gray-900 leading-none">{user.name}</span>
                                <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mt-1">{user.plan || 'Free'} Plan</span>
                            </div>
                            <img
                                src={user.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                                alt="Profile"
                                className="w-9 h-9 rounded-full border border-gray-200/60 shadow-sm object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse" />
                    )}

                    <div className="w-px h-5 bg-gray-200 mx-1"></div>

                    <button
                        onClick={handleLogout}
                        className="text-gray-400 hover:text-gray-900 transition-colors p-1"
                        title="Log out"
                    >
                        <LogOut className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
