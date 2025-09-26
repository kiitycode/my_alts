    import Navbar from "@/components/Navbar";

    export default function Page() {
    return (
        <>
        <Navbar />
    <main
    className="
        min-h-screen
        bg-[url('/assets/home/background-home-mobile.jpg')]
        md:bg-[url('/assets/home/background-home-tablet.jpg')]
        lg:bg-[url('/assets/home/background-home-desktop.jpg')]
        bg-cover bg-center bg-no-repeat
        flex items-center
    "
    >
            <div className="wrap text-center">
            <h1 className="h1">So, you want to travel to</h1>
            <p className="mt-6 text-[5rem] md:text-[8rem] font-serif text-white leading-none">
                SPACE
            </p>
            <p className="muted mx-auto mt-6 max-w-2xl">
                Let’s face it: if you want to go to space, you might as well genuinely
                go to outer space. Sit back and relax—we’ll give you a truly
                out-of-this-world experience!
            </p>
            <a
                href="/destination"
                className="btn-primary mt-12 text-lg md:text-2xl uppercase tracking-widest px-10 py-6 md:py-8"
            >
                Explore
            </a>
            </div>
        </main>
        </>
    );
    }

//     <main
//   style={{
//     minHeight: "100vh",
//     backgroundImage: "url('/assets/home/background-home-mobile.jpg')",
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//   }}
// >
//   <div style={{ padding: 24, color: "white" }}>
//     If you can see the background image now, the asset path is OK and Tailwind was the issue.
//   </div>
// </main>
