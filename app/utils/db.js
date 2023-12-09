import PouchDb from "pouchdb";

export default class DB {
  constructor(name) {
    this.db = new PouchDb(name);
  }

  async getAllItems() {
    let allItems = await this.db.allDocs({ include_docs: true });
    let items = [];

    allItems.rows.forEach((itemData) => {
      items.push(itemData.doc);
    });

    return items;
  }

  async createItem(itemName) {
    let newItem = {
      id: crypto.randomUUID(),
      name: itemName,
      quantity: 1,
      quantityName: "x",
      checked: false,
    };
    const res = await this.db.post({ ...newItem });
    this.getAllItems().then((data) => {
      return res;
    });
  }
}
