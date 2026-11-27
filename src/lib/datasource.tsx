"use client";
// Stand-in for Softr's datasource hooks. Records are loaded on the server
// (see lib/places.ts) and handed to the section through <BlockRecords>.
// Field aliases from q.select({...}) map to Airtable field names, exactly as in Softr.
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

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

// Form saves go through this site's own server (app/api/forms), which writes to
// Airtable with the same fields as the Softr forms. Until launch the server answers
// with a "this is a preview" message, so nothing is saved.
async function sendForm(form: string, data: any) {
  const res = await fetch("/api/forms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ form, data }) });
  const json: any = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json?.error || "We couldn't send that just now. Please try again.");
  return { id: json.id, fields: data };
}
export function useRecordCreate(opts: any) {
  const [isPending, setPending] = useState(false);
  const mutateAsync = async (data: any) => {
    setPending(true);
    try {
      const r = await sendForm(String(opts?.from ?? ""), data);
      try { opts?.onSuccess?.(r); } catch {}
      return r;
    } catch (e) {
      try { opts?.onError?.(e); } catch {}
      throw e;
    } finally { setPending(false); }
  };
  return {
    enabled: true, isPending, status: isPending ? "pending" : "idle", error: null, reset: () => {},
    mutate: (d: any) => { mutateAsync(d).catch(() => {}); },
    mutateAsync,
  };
}
// Nothing on the site edits or deletes records.
const NO_WRITE = new Error("This action isn't available.");
const noWrite = () => ({ enabled: false, isPending: false, status: "idle", error: null, reset: () => {}, mutate: () => {}, mutateAsync: async () => { throw NO_WRITE; } });
export const useRecordUpdate = noWrite;
export const useRecordDelete = noWrite;

// Photos go straight from the browser to the site's Vercel Blob storage; the form
// then sends their links and Airtable copies each photo when the record is saved.
export function useUpload() {
  const [isUploading, setUploading] = useState(false);
  const uploadAsync = async (files: File[] | FileList) => {
    const list = Array.from(files ?? []);
    setUploading(true);
    try {
      const { upload } = await import("@vercel/blob/client");
      return await Promise.all(list.map(async (file) => {
        try {
          const safe = (file.name || "photo").replace(/[^A-Za-z0-9._-]+/g, "-").slice(-80);
          const b = await upload("submissions/" + safe, file, { access: "public", handleUploadUrl: "/api/upload", contentType: file.type || undefined });
          return { status: "completed" as const, url: b.url, file };
        } catch (e) {
          return { status: "error" as const, url: "", file, error: e };
        }
      }));
    } finally { setUploading(false); }
  };
  return { uploadAsync, upload: (f: any) => { uploadAsync(f).catch(() => {}); }, isUploading };
}
