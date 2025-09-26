    import Image from "next/image";
    import { toPublicPath } from "@/lib/paths";

    export default function PlanetPanel({ item }) {
    const src = toPublicPath(item?.images?.webp) || toPublicPath(item?.images?.png) || "/assets/destination/image-moon.png";

    return (
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="justify-self-center">
            {/* Fallback to <img> if src is still falsy (safety) */}
            {src ? (
            <Image
                src={src}
                alt={item?.name || "Planet"}
                width={400}
                height={400}
                sizes="(max-width: 1024px) 60vw, 400px"
                className="h-auto w-[240px] md:w-[320px] lg:w-[400px] object-contain"
                priority
            />
            ) : (
            <img
                src="/assets/destination/image-moon.png"
                alt={item?.name || "Planet"}
                className="h-auto w-[240px] md:w-[320px] lg:w-[400px] object-contain"
            />
            )}
        </div>

        <div>
            <h2 className="h2">{item?.name}</h2>
            <p className="muted mt-4">{item?.description}</p>
            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <div>
                <p className="text-xs tracking-widest text-white/60 uppercase">Avg. distance</p>
                <p className="text-white text-xl mt-1">{item?.distance}</p>
            </div>
            <div>
                <p className="text-xs tracking-widest text-white/60 uppercase">Est. travel time</p>
                <p className="text-white text-xl mt-1">{item?.travel}</p>
            </div>
            </div>
        </div>
        </div>
    );
    }
