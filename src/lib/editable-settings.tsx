"use client";
// Stand-in for Softr's editable settings, so the homepage sections ported
// from Softr run unchanged. Each section gets its saved values from
// <BlockSettings values={...}>; anything not set falls back to the code default.
import { createContext, useContext, type ReactNode } from "react";

const Ctx = createContext<Record<string, any>>({});

export function BlockSettings({ values, children }: { values: Record<string, any>; children: ReactNode }) {
  return <Ctx.Provider value={values}>{children}</Ctx.Provider>;
}

function pick<T>(name: string, initialValue: T): T {
  const v = useContext(Ctx);
  return name in v ? (v[name] as T) : initialValue;
}

type Opts<T> = { name: string; label?: string; initialValue?: T; required?: boolean };

export const useTextSetting = (o: Opts<string>) => pick(o.name, o.initialValue ?? "");
export const useLongTextSetting = (o: Opts<string>) => pick(o.name, o.initialValue ?? "");
export const useImageSetting = (o: Opts<{ src: string; alt: string }>) => pick(o.name, o.initialValue ?? { src: "", alt: "" });
export const useBooleanSetting = (o: Opts<boolean>) => pick(o.name, o.initialValue ?? true);
export const useColorSetting = (o: Opts<string>) => pick(o.name, o.initialValue ?? "currentColor");
export const useArraySetting = (o: Opts<any[]> & { schema?: any }) => pick(o.name, o.initialValue ?? []);
export const useVibeCodingBlockIconSetting = (o: Opts<{ icon: string }>) => pick(o.name, o.initialValue ?? { icon: "circle" });
export const useNavigationSetting = (o: Opts<any>) => {
  const v = pick<any>(o.name, o.initialValue ?? { destination: "/" });
  return { action: "OPEN_PAGE", openIn: "SELF", ...v };
};
export const useNavigation = () => (nav: any) => {
  if (nav?.destination) window.location.href = nav.destination;
};
