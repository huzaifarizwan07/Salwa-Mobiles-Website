import Link from "next/link";
import { LayoutDashboard, Package, ShoppingBag, Users, Settings } from "lucide-react";
import LogoutButton from "@/components/admin/LogoutButton";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex bg-black text-gray-200">

            {/* Sidebar */}
            <aside className="w-64 glass border-r brutalist-border !border-y-0 !border-l-0 flex flex-col pt-8">
                <div className="px-6 mb-12">
                    <h2 className="text-xl font-heading text-white tracking-widest uppercase">
                        Salwa <span className="text-salwa-yellow">Command</span>
                    </h2>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <Link href="/admin" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-salwa-yellow/10 hover:text-salwa-yellow transition-colors group">
                        <LayoutDashboard size={20} className="group-hover:text-salwa-yellow text-gray-400" />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/inventory" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-salwa-yellow/10 hover:text-salwa-yellow transition-colors group">
                        <Package size={20} className="group-hover:text-salwa-yellow text-gray-400" />
                        <span>Inventory</span>
                    </Link>
                    <Link href="/admin/orders" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-salwa-yellow/10 hover:text-salwa-yellow transition-colors group">
                        <ShoppingBag size={20} className="group-hover:text-salwa-yellow text-gray-400" />
                        <span>Orders</span>
                    </Link>
                    <Link href="/admin/customers" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-salwa-yellow/10 hover:text-salwa-yellow transition-colors group">
                        <Users size={20} className="group-hover:text-salwa-yellow text-gray-400" />
                        <span>Customers</span>
                    </Link>
                    <Link href="/admin/settings" className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-salwa-yellow/10 hover:text-salwa-yellow transition-colors group">
                        <Settings size={20} className="group-hover:text-salwa-yellow text-gray-400" />
                        <span>Settings</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Top Navbar */}
                <header className="h-16 glass border-b border-gray-800 flex items-center justify-between px-8">
                    <div className="flex items-center">
                        {/* Breadcrumb or Title could go here */}
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right">
                            <p className="text-sm font-medium text-white">Admin User</p>
                            <p className="text-xs text-salwa-yellow">System Access</p>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gray-800 border brutalist-border border-salwa-yellow flex items-center justify-center">
                            A
                        </div>
                    </div>
                </header>

                {/* Scrollable Content Area */}
                <div className="flex-1 overflow-auto bg-[#050505] p-8">
                    {children}
                </div>
            </main>

        </div>
    );
}
