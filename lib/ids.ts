export function shortId(prefix = "id") { return prefix + "_" + crypto.randomUUID().slice(0, 8); }
export function isUuid(v: string) { return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(v); }
