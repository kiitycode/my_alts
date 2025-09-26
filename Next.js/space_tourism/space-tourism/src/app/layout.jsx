    import "./globals.css";

    export const metadata = {
    title: "Space Tourism",
    description: "Experience orbit, crew, and cutting-edge tech.",
    };

    export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
    }
