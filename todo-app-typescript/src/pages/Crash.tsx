// src/pages/Crash.tsx
import { useEffect } from "react";

export default function Crash() {
  useEffect(() => { throw new Error("Intentional crash"); }, []);
  return null;
}
