import { readJson, writeJson } from "./store";
import { loadContacts } from "./email";
export type Segment = { id: string; name: string; tag: string };
const KEY = "flomaila.segments.v1";
export function loadSegments(): Segment[] { return readJson(KEY, []); }
export function saveSegment(s: Segment) {
  writeJson(KEY, [s, ...loadSegments().filter((x) => x.id !== s.id)]);
  return loadSegments();
}
export function runSegment(s: Segment) {
  return loadContacts().filter((c) => c.tags.toLowerCase().includes(s.tag.toLowerCase()));
}
