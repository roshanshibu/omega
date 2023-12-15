import axios from "axios";

const client = axios.create({
  baseURL: "https://raw.githubusercontent.com/roshanshibu/omega_backend/main/",
});

export function getItemStats(itemName) {
  return client.get(`${itemName.toLowerCase()}.json`).then((res) => res.data);
}
