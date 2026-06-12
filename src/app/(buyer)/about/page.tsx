"use client";

import Reveal from "@/components/animations/Reveal";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-black pt-12 pb-24">
            {/* Header Banner */}
            <div className="bg-[#050505] border-b brutalist-border !border-gray-800 py-24 px-6 relative overflow-hidden flex flex-col items-center text-center">
                <div className="absolute inset-0 bg-salwa-yellow/5 blur-3xl z-0" />

                {/* Background Scrolled Text */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden opacity-[0.02] pointer-events-none select-none z-0">
                    <h1 className="text-[20vw] font-heading uppercase leading-none whitespace-nowrap">Salwa Mobiles</h1>
                </div>

                <Reveal direction="down" className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-8xl font-heading uppercase text-white mb-6">Our <span className="text-salwa-yellow">Story</span></h1>
                    <p className="text-2xl md:text-4xl font-light text-gray-300 max-w-2xl mx-auto leading-tight">
                        Future-Proof Your Grip.
                    </p>
                </Reveal>
            </div>

            <div className="max-w-4xl mx-auto px-6 mt-20 space-y-24">

                <Reveal direction="up">
                    <div className="border-l-4 border-salwa-yellow pl-8">
                        <h2 className="text-3xl font-heading uppercase tracking-widest text-salwa-yellow mb-4">Our Vision: The Gold Standard of Tech</h2>
                        <p className="text-xl text-gray-300 leading-relaxed font-light">
                            In a world of generic stores, <span className="text-white font-medium">SALWA MOBILES</span> was born to stand out. We believe that a mobile phone is more than a tool—it's an extension of who you are. That's why we've built a destination that combines the raw energy of modern design with the precision of elite technology.
                        </p>
                    </div>
                </Reveal>

                <Reveal direction="up">
                    <h2 className="text-4xl font-heading uppercase tracking-[0.2em] text-white text-center mb-16">What We Stand For</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

                        <div className="border brutalist-border !border-gray-800 bg-[#050505] p-8 hover:!border-salwa-yellow transition-colors group">
                            <h3 className="text-salwa-yellow font-heading text-xl uppercase tracking-widest mb-4 group-hover:block hidden animate-[glitch_0.5s_linear]">The Curated Edit</h3>
                            <h3 className="text-salwa-yellow font-heading text-xl uppercase tracking-widest mb-4 group-hover:hidden block">The Curated Edit</h3>
                            <p className="text-gray-400">
                                We don't stock everything; we only stock the best. Every phone and accessory in our "Vault" is tested for performance, durability, and style.
                            </p>
                        </div>

                        <div className="border brutalist-border !border-gray-800 bg-[#050505] p-8 hover:!border-salwa-yellow transition-colors group">
                            <h3 className="text-salwa-yellow font-heading text-xl uppercase tracking-widest mb-4 group-hover:block hidden animate-[glitch_0.5s_linear]">Speed is Our Language</h3>
                            <h3 className="text-salwa-yellow font-heading text-xl uppercase tracking-widest mb-4 group-hover:hidden block">Speed is Our Language</h3>
                            <p className="text-gray-400">
                                From our lightning-fast website animations to our rapid shipping and payment processing, we value your time as much as you do.
                            </p>
                        </div>

                        <div className="border brutalist-border !border-gray-800 bg-[#050505] p-8 hover:!border-salwa-yellow transition-colors group">
                            <h3 className="text-salwa-yellow font-heading text-xl uppercase tracking-widest mb-4 group-hover:block hidden animate-[glitch_0.5s_linear]">Unrivaled Support</h3>
                            <h3 className="text-salwa-yellow font-heading text-xl uppercase tracking-widest mb-4 group-hover:hidden block">Unrivaled Support</h3>
                            <p className="text-gray-400">
                                Whether you're a first-time buyer or a tech veteran, our team is here to ensure your gear works perfectly from day one.
                            </p>
                        </div>

                    </div>
                </Reveal>

                <Reveal direction="up">
                    <div className="bg-salwa-yellow text-black p-12 text-center brutalist-border hover:bg-black hover:text-salwa-yellow transition-colors duration-500">
                        <h2 className="text-3xl md:text-5xl font-heading uppercase tracking-widest mb-6">Beyond The Box</h2>
                        <p className="text-xl max-w-2xl mx-auto font-medium mb-8">
                            Based in the heart of the tech revolution, SALWA MOBILES is a community for those who demand more from their devices. We are sellers, yes—but we are enthusiasts first.
                        </p>
                        <p className="text-xl md:text-3xl font-heading uppercase tracking-widest italic">
                            Welcome to the next level of mobile retail.
                        </p>
                    </div>
                </Reveal>

            </div>
        </div>
    );
}
