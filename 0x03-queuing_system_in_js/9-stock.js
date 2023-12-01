const express = require('express');
const app = express();
const redis = require('redis');
const util = require('util');

const client = redis.createClient();

const listProducts = [
  {
    id : '1',
    name: 'Suitcase 250',
    price: '50',
    stock: '4'
  },
  {
    id : '2',
    name: 'Suitcase 450',
    price: '100',
    stock: '10'
  },
  {
    id : '3',
    name: 'Suitcase 650',
    price: '350',
    stock: '2'
  },
  {
    id : '4',
    name: 'Suitcase 1050',
    price: '550',
    stock: '5'
  }
];

function getItemById(id) {
  for (const item of listProducts) {
    if (item.id === id) {
      return item;
    }
  }
};

app.listen(1245, () => {
  console.log("Server is listening");
});

app.get('/list_products', (req, res) => {
  res.send(JSON.stringify(listProducts));
});

function reserveStockById(itemId, stock) {
  const key = itemId;
  client.set(key, stock);
};

async function getCurrentReservedStockById(itemId) {
  const getValue = util.promisify(client.get).bind(client);
  const key = itemId;
  const reserved = await getValue(key);
  return reserved;
};

app.get('/list_products/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const item = getItemById(itemId);
  if (item) {
    for (const j of listProducts) {
      const result = getCurrentReservedStockById(j.id);
      const r = {
        "itemId":itemId,
        "itemName":j.name,
        "price":j.price,
        "initialAvailableQuantity":j.stock,
        "currentQuantity":Number(j.stock) - Number(result)
      };
      res.send(JSON.stringify(r));
    }
  } else {
    const response = {"status":"Product not found"};
    res.send(response);
  }
});

app.get('/reserve_product/:itemId', (req, res) => {
  const itemId = req.params.itemId;
  const item = getItemById(itemId);
  if (item) {
    for (const i of listProducts) {
      if (i.stock >= 1) {
        const reservedItem = reserveStockById(i.id, i.stock);
	const ans = {"status":"Reservation confirmed","itemId":`${i.id}`}
	res.send(JSON.stringify(ans));
      } else {
	const resp = {"status":"Not enough stock available","itemId":`${i.id}`};
	res.send(JSON.stringify(resp));
      }
    }
  } else {
    res.send({"status":"Product not found"});
  }
});
