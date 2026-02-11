import Link from "next/link";
import clsx from "clsx";

export default function Navbar() {
    return (
        <header className="fixed top-0 left-0 w-full z-40 bg-black/10 backdrop-blur-md border-b border-white/5 transition-all duration-300">
            <div className="mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-black italic tracking-widest text-white font-orbitron">
                        BUGATTI
                    </span>
                </div>

                {/* NAV LINKS */}
                <nav className="hidden md:flex gap-8">
                    {["Models", "Brand", "Ownership", "Store"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-400 hover:text-bugatti-gold transition-colors font-rajdhani"
                        >
                            {item}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <button className="hidden md:block px-6 py-2 border border-bugatti-gold/30 text-[10px] font-bold uppercase tracking-[0.2em] text-bugatti-gold hover:bg-bugatti-gold hover:text-black transition-all duration-300 font-orbitron">
                    Configure
                </button>
            </div>
        </header>
    );
}
