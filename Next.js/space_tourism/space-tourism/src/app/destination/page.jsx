    "use client";
    import Navbar from "@/components/Navbar";
    import Tabs from "@/components/Tabs";
    import PlanetPanel from "@/components/PlanetPanel";
    import data from "@/data/data.json";

    export default function DestinationPage() {
    const items = data.destinations.map((d) => ({ label: d.name, value: d }));
    return (
        <>
        <Navbar />
        <main
            className="
            min-h-screen
            bg-[url('/assets/destination/background-destination-mobile.jpg')]
            md:bg-[url('/assets/destination/background-destination-tablet.jpg')]
            lg:bg-[url('/assets/destination/background-destination-desktop.jpg')]
            bg-cover bg-center bg-no-repeat
            py-10 md:py-16
            "
        >
            <div className="wrap">
            <h1 className="h2 mb-8 md:mb-12">Pick your destination</h1>
            <Tabs
                items={items}
                ariaLabel="Destinations"
                render={(it) => <PlanetPanel item={it.value} />}
            />
            </div>
        </main>
        </>
    );
    }
