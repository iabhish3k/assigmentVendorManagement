import Sidebar from '@/components/Sidebar';
import React from 'react';



const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 ">
                <main >
                    {children} 
                </main>
            </div>
        </div>
    );
};

export default Layout;