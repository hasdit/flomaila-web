import { loadContacts } from "./email";
import { loadOrders } from "./orders";
import { loadThreads } from "./inbox";
import { addSuppress } from "./suppress";
export function exportCustomer(email: string) {
  const e = email.toLowerCase();
  return {
    contact: loadContacts().filter((c) => c.email.toLowerCase() === e),
    orders: loadOrders().filter((o) => o.customer.toLowerCase().includes(e.split("@")[0])),
    threads: loadThreads().filter((t) => t.name.toLowerCase().includes(e.split("@")[0])),
  };
}
export function forgetCustomer(email: string) {
  addSuppress(email);
  return { forgotten: email, suppressed: true };
}
