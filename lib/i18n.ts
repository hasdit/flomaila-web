export const STRINGS = { en: { inbox: "Inbox", orders: "Orders", save: "Save" }, bn: { inbox: "\u0987\u09a8\u09ac\u0995\u09cd\u09b8", orders: "\u0985\u09b0\u09cd\u09a1\u09be\u09b0", save: "\u09b8\u09c7\u09ad" }, de: { inbox: "Posteingang", orders: "Bestellungen", save: "Speichern" } };
export type Locale = keyof typeof STRINGS;
export function t(locale: Locale, key: keyof typeof STRINGS.en) { return STRINGS[locale]?.[key] || STRINGS.en[key]; }
