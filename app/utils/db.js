// db.js
import Dexie from "dexie";

export const db = new Dexie("omega");
db.version(1).stores({
  items: "++id, name", // Primary key and indexed props
});
