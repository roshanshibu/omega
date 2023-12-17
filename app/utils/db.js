// db.js
import Dexie from "dexie";
import { getSmallDate } from "./date";

export const db = new Dexie("omega");
db.version(1).stores({
  items: "++id, &name",
  tags: "++id, name",
  barCodes: "++id, &name",
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
          name: "Eggs",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 6 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 12,
          count: 1,
        },
        {
          id: crypto.randomUUID(),
          name: "Dishwasher Tabs",
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
          name: "Tomato",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 25 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 10,
          count: 3,
        },
        {
          id: crypto.randomUUID(),
          name: "Chicken",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 5 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 7,
          count: 1,
        },
        {
          id: crypto.randomUUID(),
          name: "Cheese",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 60 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 14,
          count: 1,
        },
        {
          id: crypto.randomUUID(),
          name: "Orange juice",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 2 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 7,
          count: 1,
        },
        {
          id: crypto.randomUUID(),
          name: "Kitchen tissue",
          quantity: 1,
          quantityName: "x",
          checked: true,
          lastChecked: getSmallDate(new Date(Date.now() - 15 * 86400000)),
          lastUnchecked: 0,
          averageDuration: 30,
          count: 1,
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

export const addBarCodeData = () => {
  console.log("addBarCodeData was called...");
  // check if there is data in db...
  db.barCodes.toArray().then((data) => {
    if (data.length == 0) {
      console.log("adding bar codes...");
      let barCodeData = [
        {
          name: "milk",
          codes: [4311501489871],
        },
        {
          name: "salt",
          codes: [4001475101601],
        },
        {
          name: "tea",
          codes: [4009300008040, 9001475049106],
        },
        {
          name: "cereal",
          codes: [5010029201246],
        },
        {
          name: "dishwasher tabs",
          codes: [4311501033562],
        },
      ];

      barCodeData.map((barCode) => {
        const id = db.barCodes
          .add({
            ...barCode,
          })
          .then(() =>
            console.log(`Added item ${barCode.name} for test and demo`)
          )
          .catch((error) => {
            // console.log("error in db while creating dummy data:", error);
          });
      });
    }
  });
};
