    export function toPublicPath(p) {
    if (!p || typeof p !== "string") return undefined;
    // force forward slashes + leading slash
    const clean = p.replaceAll("\\", "/").replace(/^(\.\/)+/, "");
    return clean.startsWith("/") ? clean : `/${clean}`;
    }
