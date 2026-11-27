"use client";
// Which city a city page is about (Softr read this from the page address).
import { createContext, useContext, type ReactNode } from "react";
const Ctx = createContext("");
export function CitySlug({ slug, children }: { slug: string; children: ReactNode }) {
  return <Ctx.Provider value={slug}>{children}</Ctx.Provider>;
}
export const useCitySlug = () => useContext(Ctx);
