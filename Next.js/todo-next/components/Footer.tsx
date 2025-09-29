    export default function Footer(): JSX.Element {
    return (
        <footer className="mt-auto py-6 border-t bg-white/50">
        <div className="max-w-6xl mx-auto px-4 text-center text-sm text-slate-600">
            © {new Date().getFullYear()} Oluwatosin — TodoNext
        </div>
        </footer>
    );
    }

