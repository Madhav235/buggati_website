export default function Footer() {
    return (
        <footer className="bg-neutral-950 border-t border-white/5 py-12 px-6 relative z-10">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="font-orbitron text-2xl font-black italic text-white tracking-widest">
                    BUGATTI
                </div>

                <div className="flex gap-8 text-[10px] uppercase tracking-[0.2em] text-neutral-500 font-mono">
                    <a href="#" className="hover:text-white transition-colors">Legal Class</a>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Cookie Settings</a>
                </div>

                <div className="text-[10px] text-neutral-600 font-mono uppercase">
                    © 2024 Bugatti Automobiles S.A.S.
                </div>
            </div>
        </footer>
    );
}
