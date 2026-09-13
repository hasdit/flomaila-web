export function parseCsv(text: string) { return text.trim().split(/\r?\n/).filter(Boolean).map((line) => line.split(",").map((c) => c.trim())); }
export function toCsv(rows: string[][]) { return rows.map((r) => r.map((c) => (c.includes(",") ? `"${c}"` : c)).join(",")).join("\n"); }
