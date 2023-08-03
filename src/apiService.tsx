import axios from "axios";
import { Body } from "./type";

//dev
// const instance = axios.create({
//   baseURL: "http://localhost:8000",
// });

//prod
const instance = axios.create({
  baseURL: "https://expressjs-server-production-4c10.up.railway.app",
});

//==============================( POST )==============================

// create new item
export const createItem = async (body: Body, token: string) => {
  await instance.post("item", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//=======================( GET )===========================

// fetch all unpurchased items
export const getUnpurchasedItems = async (token: string) => {
  const response = await instance.get("all-unpurchased-items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.items;
};

// fetch all purchased items
export const getPurchasedItems = async (token: string) => {
  const response = await instance.get("all-purchased-items", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.items;
};

// get item by id
export const getItemById = async (id: string, token: string) => {
  const response = await instance.get(`item/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.item;
};

// group items by category
export const getItemCountByCategory = async (token: string) => {
  const response = await instance.get("items-count-by-category", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.data;
};

//==============================( PUT )==============================

// update item purchased to true
export const markItemAsPurchased = async (id: string, token: string) => {
  await instance.put(
    `item-purchased/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

//update item content
export const updateItemById = async (id: string, body: Body, token: string) => {
  await instance.put(`item/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

//==============================( DELETE )==============================

// delete a item by id
export const deleteItemById = async (id: string, token: string) => {
  await instance.delete(`item/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
