export function slaDue(hours = 4) { return new Date(Date.now() + hours * 3600000).toISOString(); }
export function slaBreached(dueIso?: string | null) { return dueIso ? new Date(dueIso).getTime() < Date.now() : false; }
