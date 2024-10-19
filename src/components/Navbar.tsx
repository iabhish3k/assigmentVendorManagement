'use client';

import { Sun, Moon } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { useTheme } from "@/context/ThemeContext";

interface NavbarProps {
    title: string;
}

export default function Navbar({ title }: NavbarProps) { 
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <div className={`${isDarkTheme ? 'bg-gray-900 text-gray-100 border-b border-gray-700' : 'bg-white text-gray-900 border-b border-gray-300'} transition-colors duration-300 sticky top-0 z-10`}>
            <div className="flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold">{title}</h1>
                <div className="flex items-center space-x-2">
                    <Sun className={`h-5 w-5 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`} />
                    <Switch checked={isDarkTheme} onCheckedChange={toggleTheme} />
                    <Moon className={`h-5 w-5 ${isDarkTheme ? 'text-gray-600' : 'text-gray-400'}`} />
                </div>
            </div>
        </div>
    );
}
