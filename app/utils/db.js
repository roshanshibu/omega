// db.js
import Dexie from "dexie";
import { getSmallDate } from "./date";

export const db = new Dexie("omega");
db.version(1).stores({
  items: "++id, &name", // Primary key and indexed props
  tags: "++id, name", // Primary key and indexed props
});

export const addCleanDemoData = () => {
  console.log("addCleanDemoData was called...");
  // check if there is data in db...
  db.items.toArray().then((data) => {
    if (data.length == 0) {
      console.log("adding dummy data...");
      let demoItems = [
        {
          id: crypto.randomUUID(),
          name: "Cereal",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 2 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 10,
          count: 1,
        },
        {
          id: crypto.randomUUID(),
          name: "Carrots",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 5 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 4,
          count: 1,
        },
        {
          id: crypto.randomUUID(),
          name: "Potato",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 40 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 30,
          count: 4,
        },
        {
          id: crypto.randomUUID(),
          name: "Milk",
          quantity: 2,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 0 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 2,
          count: 20,
        },
        {
          id: crypto.randomUUID(),
          name: "Tomato",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 25 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 10,
          count: 3,
        },
      ];

      demoItems.map((demoItem) => {
        const id = db.items
          .add({
            ...demoItem,
          })
          .then(() =>
            console.log(`Added item ${demoItem.name} for test and demo`)
          )
          .catch((error) => {
            // console.log("error in db while creating dummy data:", error);
          });
      });
    }
  });
};
