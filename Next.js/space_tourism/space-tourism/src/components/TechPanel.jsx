    import Image from "next/image";
    import { toPublicPath } from "@/lib/paths";

    export default function TechPanel({ item }) {
    const landscape = toPublicPath(item?.images?.landscape);
    const portrait  = toPublicPath(item?.images?.portrait);
    const src = landscape || portrait || "/assets/technology/image-launch-vehicle-landscape.jpg";

    return (
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
            {src ? (
            <Image
                src={src}
                alt={item?.name || "Technology"}
                width={800}
                height={500}
                sizes="(max-width: 1024px) 90vw, 800px"
                className="w-full rounded-2xl h-auto object-cover"
                priority
            />
            ) : (
            <img src="/assets/technology/image-launch-vehicle-landscape.jpg" alt="Technology" className="w-full rounded-2xl h-auto object-cover" />
            )}
        </div>
        <div>
            <p className="uppercase text-white/60 tracking-widest">The terminology…</p>
            <h2 className="h2 mt-2">{item?.name}</h2>
            <p className="muted mt-4">{item?.description}</p>
        </div>
        </div>
    );
    }
