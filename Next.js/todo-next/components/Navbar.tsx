    "use client";

    import Link from "next/link";

    export default function Navbar() {
    return (
        <nav className="w-full border-b border-gray-700 mb-6">
        <div className="max-w-6xl mx-auto px-8 py-3 flex justify-center gap-6 text-[1.05rem]">
            <Link
            href="/"
            className="px-3 py-2 border border-transparent rounded-md hover:border-yellow-400 hover:text-yellow-400 transition"
            >
            Home
            </Link>
        </div>
        </nav>
    );
    }
