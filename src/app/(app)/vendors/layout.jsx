import Navbar from "@/components/Navbar";

export default async function RootLayout({ children }) {
    return (
        <div >
            <Navbar title="Vendor List" />
            <main className="flex-1 ">{children}</main>
        </div>
    );
}
