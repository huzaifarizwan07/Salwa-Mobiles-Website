import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/context/CartContext";
import { DiscountProvider } from "@/context/DiscountContext";
import CartDrawer from "@/components/ui/CartDrawer";
import DiscountBanner from "@/components/layout/DiscountBanner";

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
    return (
        <DiscountProvider>
            <CartProvider>
                <div className="min-h-screen flex flex-col relative">
                    <DiscountBanner />
                    <Header />
                    <CartDrawer />
                    <main className="flex-1 flex flex-col">
                        {children}
                    </main>
                    <Footer />
                </div>
            </CartProvider>
        </DiscountProvider>
    );
}
