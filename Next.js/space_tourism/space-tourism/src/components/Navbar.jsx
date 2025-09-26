    "use client";
    import Link from "next/link";
    import { usePathname } from "next/navigation";

    const links = [
    { href: "/", label: "Home" },
    { href: "/destination", label: "Destination" },
    { href: "/crew", label: "Crew" },
    { href: "/technology", label: "Technology" },
    ];

    export default function Navbar() {
    const pathname = usePathname();
    return (
        <nav className="container flex items-center justify-between py-6">
        <div className="text-white/90 font-semibold">SPACE TOURISM</div>
        <ul className="flex gap-6">
            {links.map((l) => (
            <li key={l.href}>
                <Link
                href={l.href}
                className={`tab ${pathname === l.href ? "tab-active" : ""}`}
                >
                {l.label}
                </Link>
            </li>
            ))}
        </ul>
        </nav>
    );
    }
