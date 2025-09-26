    "use client";
    import Navbar from "@/components/Navbar";
    import Tabs from "@/components/Tabs";
    import TechPanel from "@/components/TechPanel";
    import data from "@/data/data.json";

    export default function TechnologyPage() {
    const items = data.technology.map((t, i) => ({
        label: String(i + 1),
        value: t,
        key: i,
    }));
    return (
        <>
        <Navbar />
        <main
            className="
            min-h-screen
            bg-[url('/assets/technology/background-technology-mobile.jpg')]
            md:bg-[url('/assets/technology/background-technology-tablet.jpg')]
            lg:bg-[url('/assets/technology/background-technology-desktop.jpg')]
            bg-cover bg-center bg-no-repeat
            py-10 md:py-16
            "
        >
            <div className="wrap">
            <h1 className="h2 mb-8 md:mb-12">Space launch technology</h1>
            <Tabs
                items={items}
                ariaLabel="Technology"
                render={(it) => <TechPanel item={it.value} />}
            />
            </div>
        </main>
        </>
    );
    }
