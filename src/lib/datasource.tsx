"use client";
// Stand-in for Softr's datasource hooks. Records are loaded on the server
// (see lib/places.ts) and handed to the section through <BlockRecords>.
// Field aliases from q.select({...}) map to Airtable field names, exactly as in Softr.
import { createContext, useContext, useMemo, type ReactNode } from "react";

const RecordsCtx = createContext<{ id: string; fields: Record<string, any> }[]>([]);

export function BlockRecords({ records, children }: { records: any[]; children: ReactNode }) {
  return <RecordsCtx.Provider value={records}>{children}</RecordsCtx.Provider>;
}

export const datasource = { define: <T extends Record<string, string>>(m: T) => m };

const sel = (m: Record<string, string>) => ({ __select: m });
const field = (f: string) => ({ f });
export const q = {
  select: sel,
  text: field, number: field, boolean: field, date: field, array: field,
  and: (...a: any[]) => a, or: (...a: any[]) => a,
  asc: (f: string) => ({ f, dir: "asc" }), desc: (f: string) => ({ f, dir: "desc" }),
};
export const metric = {};

function mapRecord(r: { id: string; fields: Record<string, any> }, select: Record<string, string>) {
  const fields: Record<string, any> = {};
  for (const [alias, name] of Object.entries(select)) {
    const v = r.fields[name];
    if (v === undefined) continue;
    // Softr returns select options as { label }; keep name too so either works.
    fields[alias] = Array.isArray(v)
      ? v.map((x) => (x && typeof x === "object" && "name" in x && !("url" in x) ? { ...x, label: x.name } : x))
      : v && typeof v === "object" && "name" in v ? { ...v, label: v.name } : v;
  }
  return { id: r.id, fields };
}

export function useRecords(opts: { select: { __select: Record<string, string> }; [k: string]: any }) {
  const records = useContext(RecordsCtx);
  const items = useMemo(() => records.map((r) => mapRecord(r, opts.select.__select)), [records, opts.select]);
  return {
    data: { pages: [{ items, total: items.length, offset: null }] },
    status: "success" as const, error: null, hasNextPage: false, isFetching: false,
    isFetchingNextPage: false, fetchNextPage: () => {}, refetch: async () => {}, isRefetching: false, isRefetchError: false,
  };
}

// The one record a detail page is about (Softr's "current record").
const RecordCtx = createContext<{ id: string; fields: Record<string, any> } | null>(null);
export function BlockRecord({ record, children }: { record: { id: string; fields: Record<string, any> }; children: ReactNode }) {
  return <RecordCtx.Provider value={record}>{children}</RecordCtx.Provider>;
}
export const useCurrentRecordId = () => useContext(RecordCtx)?.id ?? null;
export function useRecord(opts: { select: { __select: Record<string, string> }; [k: string]: any }) {
  const r = useContext(RecordCtx);
  const data = useMemo(() => (r ? mapRecord(r, opts.select.__select) : undefined), [r, opts.select]);
  return { data, status: (r ? "success" : "error") as "success" | "error", error: null, isLoading: false, isFetching: false, refetch: async () => {} };
}

// Writes are switched off in this preview: forms show a "try again" message
// and nothing is sent to Airtable. They get wired up before launch.
const PREVIEW_ERR = new Error("Submissions are turned off on the preview site.");
export function useRecordCreate(opts: any) {
  return {
    enabled: true, isPending: false, status: "idle", error: null, reset: () => {},
    mutate: () => { try { opts?.onError?.(PREVIEW_ERR); } catch {} },
    mutateAsync: async () => { try { opts?.onError?.(PREVIEW_ERR); } catch {} throw PREVIEW_ERR; },
  };
}
export const useRecordUpdate = useRecordCreate;
export const useRecordDelete = useRecordCreate;
export function useUpload() {
  return { uploadAsync: async (_f?: any) => [] as any[], upload: () => {}, isUploading: false };
}
