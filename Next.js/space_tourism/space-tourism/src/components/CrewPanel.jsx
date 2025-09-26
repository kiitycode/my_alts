    import Image from "next/image";
    import { toPublicPath } from "@/lib/paths";

    export default function CrewPanel({ item }) {
    const src = toPublicPath(item?.images?.webp) || toPublicPath(item?.images?.png) || "/assets/crew/image-douglas-hurley.png";

    return (
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
            <p className="uppercase text-white/60 tracking-widest">{item?.role}</p>
            <h2 className="h2 mt-2">{item?.name}</h2>
            <p className="muted mt-4">{item?.bio}</p>
        </div>
        <div className="justify-self-center">
            {src ? (
            <Image
                src={src}
                alt={item?.name || "Crew member"}
                width={360}
                height={480}
                sizes="(max-width: 1024px) 60vw, 360px"
                className="h-auto max-h-[480px] object-contain"
                priority
            />
            ) : (
            <img src="/assets/crew/image-douglas-hurley.png" alt="Crew member" className="h-auto max-h-[480px] object-contain" />
            )}
        </div>
        </div>
    );
    }
