const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

function loadProducts() {
  return JSON.parse(fs.readFileSync("products.json", "utf8"));
}

function loadCache() {
  return JSON.parse(fs.readFileSync("cache.json", "utf8"));
}

function saveCache(data) {
  fs.writeFileSync("cache.json", JSON.stringify(data, null, 2));
}

app.get("/products", (req, res) => {
  const cache = loadCache();
  const now = Date.now();

  // Cache dura 1 minuto
  if (cache.lastUpdate && now - cache.lastUpdate < 60000) {
    return res.json({
      source: "cache",
      data: cache.products
    });
  }

  const products = loadProducts();

  saveCache({
    products,
    lastUpdate: now
  });

  res.json({
    source: "database",
    data: products
  });
});

app.listen(3000, () => {
  console.log("API TechMarket rodando na porta 3000 🚀");
});
