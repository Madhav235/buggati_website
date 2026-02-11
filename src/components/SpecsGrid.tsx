export default function SpecsGrid() {
    const specs = [
        { label: "Top Speed", value: "420 km/h", sub: "Speed Key Required" },
        { label: "Acceleration", value: "2.4s", sub: "0-100 km/h" },
        { label: "Weight", value: "1995 kg", sub: "Dry Weight" },
        { label: "Transmission", value: "7-Speed", sub: "Dual Clutch" },
    ];

    return (
        <section className="bg-neutral-950 py-32 px-6 md:px-12 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-xs text-bugatti-gold uppercase tracking-[0.4em] mb-4 font-orbitron">Technical Data</h2>
                    <h3 className="text-3xl md:text-5xl font-light text-white font-rajdhani uppercase">Precision Engineering</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
                    {specs.map((spec, i) => (
                        <div key={i} className="bg-neutral-950 p-12 group hover:bg-neutral-900/50 transition-colors duration-500">
                            <div className="text-xs text-neutral-500 uppercase tracking-widest mb-4 group-hover:text-bugatti-gold transition-colors">{spec.label}</div>
                            <div className="text-4xl font-light text-white font-rajdhani mb-2">{spec.value}</div>
                            <div className="text-[10px] text-neutral-600 font-mono">{spec.sub}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
