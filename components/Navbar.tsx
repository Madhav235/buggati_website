import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center mix-blend-difference text-white">
            <Link href="/" className="text-2xl font-black tracking-widest uppercase">
                BUGATTI
            </Link>

            <div className="hidden md:flex gap-8 text-sm font-medium tracking-wide">
                <Link href="#" className="hover:opacity-70 transition-opacity">MODELS</Link>
                <Link href="#" className="hover:opacity-70 transition-opacity">BRAND</Link>
                <Link href="#" className="hover:opacity-70 transition-opacity">OWNERSHIP</Link>
            </div>

            <button className="border border-white/30 px-6 py-2 text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all">
                MENU
            </button>
        </nav>
    );
}
