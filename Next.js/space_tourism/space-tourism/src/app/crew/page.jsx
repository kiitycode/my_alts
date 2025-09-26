    "use client";
    import Navbar from "@/components/Navbar";
    import Tabs from "@/components/Tabs";
    import CrewPanel from "@/components/CrewPanel";
    import data from "@/data/data.json";

    export default function CrewPage() {
    const items = data.crew.map((c, i) => ({ label: c.name, value: c, key: i }));
    return (
        <>
        <Navbar />
        <main
            className="
            min-h-screen
            bg-[url('/assets/crew/background-crew-mobile.jpg')]
            md:bg-[url('/assets/crew/background-crew-tablet.jpg')]
            lg:bg-[url('/assets/crew/background-crew-desktop.jpg')]
            bg-cover bg-center bg-no-repeat
            py-10 md:py-16
            "
        >
            <div className="wrap">
            <h1 className="h2 mb-8 md:mb-12">Meet your crew</h1>
            <Tabs
                items={items}
                ariaLabel="Crew"
                render={(it) => <CrewPanel item={it.value} />}
            />
            </div>
        </main>
        </>
    );
    }
