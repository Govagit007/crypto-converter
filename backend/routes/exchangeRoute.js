const express = require("express");

const { coinApi, currencyApi } = require("../apiCall");

const router = express.Router();

router.get("/", async (req, res) => {
  const { coin, currency } = req.body;
  console.log(req.body);
  const coins = await coinApi();
  const currencies = await currencyApi();
  const ans = coin.price * currency.price;
  res.json({
    ans,
  });
});

module.exports = router;
