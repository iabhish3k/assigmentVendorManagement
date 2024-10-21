'use client';
import React from 'react';
import { Button } from '@/components/ui/button'; // Adjust the import as necessary
import { Home, Users, FileText, Settings, LogOut } from 'lucide-react'; // Adjust according to your icon library
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const Sidebar = () => {
    const { isDarkTheme } = useTheme();
    const router = useRouter(); // Initialize the router

    // Logout function
    const handleLogout = () => {
        // Clear session storage or any other stored user data
        Cookies.remove('token');

        // Optionally, you may want to clear other user-related data

        // Redirect to login or home page
        router.push('/login'); // Adjust the route as necessary
    };
    return (
        <aside className={`w-64 min-h-screen sticky top-0 h-screen p-4 ${isDarkTheme ? 'bg-gray-800 text-gray-100' : 'bg-gray-200 text-gray-900'}  transition-colors duration-300`}>
            <nav className="space-y-2">
                <Link href="/dashboard">
                    <Button variant="ghost" className="w-full justify-start">
                        <Home className="mr-2 h-4 w-4" />
                        Dashboard
                    </Button>
                </Link>
                <Link href="/vendors">
                    <Button variant="ghost" className="w-full justify-start">
                        <Users className="mr-2 h-4 w-4" />
                        Vendors
                    </Button>
                </Link>
                <Button variant="ghost" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Reports
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                </Button>
            </nav>
            <div className="absolute bottom-4">
                <Button variant="ghost" className="w-full justify-start text-red-600 dark:text-red-400" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </aside>
    );
};

export default Sidebar;
