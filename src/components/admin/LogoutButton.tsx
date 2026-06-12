"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await fetch("/api/admin/logout", {
                method: "POST",
            });
            router.push("/");
            router.refresh();
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-red-500/10 hover:text-red-500 transition-colors group text-gray-400"
        >
            <LogOut size={20} />
            <span>Exit Command</span>
        </button>
    );
}
