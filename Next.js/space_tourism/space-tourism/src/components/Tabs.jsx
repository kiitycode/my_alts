    "use client";
    import { useState } from "react";

    export default function Tabs({ items, render, ariaLabel = "tabs" }) {
    const [active, setActive] = useState(0);
    return (
        <div>
        <div
            role="tablist"
            aria-label={ariaLabel}
            className="flex gap-6 border-b border-white/10"
        >
            {items.map((it, i) => (
            <button
                key={it.key ?? it.label ?? i}
                role="tab"
                aria-selected={active === i}
                className={`pb-3 tab ${active === i ? "tab-active" : ""}`}
                onClick={() => setActive(i)}
            >
                {it.label}
            </button>
            ))}
        </div>
        <div role="tabpanel" className="mt-8">
            {render(items[active], active)}
        </div>
        </div>
    );
    }
