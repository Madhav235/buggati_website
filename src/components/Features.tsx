import { Zap as ZapIcon, Wind as WindIcon, Award as AwardIcon } from 'lucide-react'

export default function Features() {

    const features = [
        {
            icon: <WindIcon className="w-8 h-8 text-bugatti-gold" />,
            title: "Aerodynamics",
            desc: "Active rear wing and air brakes that adjust automatically to optimize downforce."
        },
        {
            icon: <ZapIcon className="w-8 h-8 text-bugatti-gold" />,
            title: "Quad-Turbo",
            desc: "Four turbochargers work in a two-stage configuration for linear power delivery."
        },
        {
            icon: <AwardIcon className="w-8 h-8 text-bugatti-gold" />,
            title: "Craftsmanship",
            desc: "Every component is assembled by hand in the Molsheim Atelier."
        },
    ];

    return (
        <section className="bg-black py-32 px-6 md:px-12 relative z-10 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-bugatti-gold/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto relative cursor-default">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                    {features.map((f, i) => (
                        <div key={i} className="group">
                            <div className="mb-8 p-4 bg-white/5 rounded-full w-fit group-hover:bg-bugatti-gold/10 transition-colors duration-300">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white uppercase tracking-widest font-orbitron mb-4">
                                {f.title}
                            </h3>
                            <p className="text-neutral-400 font-rajdhani font-light text-lg leading-relaxed group-hover:text-neutral-200 transition-colors">
                                {f.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
