import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="border-t brutalist-border !border-x-0 !border-b-0 py-12 px-6 mt-20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                <div className="md:col-span-2">
                    <h2 className="text-3xl font-heading text-white tracking-widest uppercase mb-4">
                        Salwa <span className="text-salwa-yellow">Mobiles</span>
                    </h2>
                    <p className="text-gray-400 max-w-sm mb-6">
                        Future-Proof Your Grip. We curate the tech that defines your lifestyle. Premium mobile hardware and elite accessories.
                    </p>
                    <div className="flex space-x-4">
                        <Link href="#" className="w-10 h-10 flex items-center justify-center border brutalist-border hover:bg-salwa-yellow hover:text-black transition-colors">
                            <Instagram size={20} />
                        </Link>
                        <Link href="#" className="w-10 h-10 flex items-center justify-center border brutalist-border hover:bg-salwa-yellow hover:text-black transition-colors">
                            <Twitter size={20} />
                        </Link>
                        <Link href="#" className="w-10 h-10 flex items-center justify-center border brutalist-border hover:bg-salwa-yellow hover:text-black transition-colors">
                            <Facebook size={20} />
                        </Link>
                    </div>
                </div>

                <div>
                    <h3 className="text-salwa-yellow font-heading uppercase tracking-wide mb-4">Shop</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link href="/shop" className="hover:text-white transition-colors">All Products</Link></li>
                        <li><Link href="/shop?category=phones" className="hover:text-white transition-colors">Phones</Link></li>
                        <li><Link href="/shop?category=audio" className="hover:text-white transition-colors">Audio Gear</Link></li>
                        <li><Link href="/shop?category=protection" className="hover:text-white transition-colors">Protection</Link></li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-salwa-yellow font-heading uppercase tracking-wide mb-4">Company</h3>
                    <ul className="space-y-2 text-gray-400">
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/track" className="hover:text-white transition-colors">Track Order</Link></li>
                    </ul>
                </div>

            </div>
            <div className="max-w-7xl mx-auto border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} SALWA MOBILES. All rights reserved.
            </div>
        </footer>
    );
}
