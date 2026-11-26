"use client";
import type { ReactNode } from "react";

export function NavigationAction({ navigation, children, className, recordId }: { navigation: any; children: ReactNode; className?: string; recordId?: string; datasourceId?: string }) {
  const href = (navigation?.destination || "/") + (recordId ? `?recordId=${recordId}` : "");
  const tab = navigation?.openIn === "TAB";
  return (
    <a href={href} className={className} {...(tab ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
      {children}
    </a>
  );
}
