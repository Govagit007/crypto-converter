const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const { coinApi, currencyApi } = require("./apiCall");

const exchangeRoute = require("./routes/exchangeRoute");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is Running.....");
});

app.get("/coins", async (req, res) => {
  const response = await coinApi();

  const data = response?.map((r) => {
    return {
      id: r.uuid,
      symbol: r.symbol,
      name: r.name,
      color: r.color,
      iconUrl: r.iconUrl,
      price: r.price,
    };
  });
  res.json({
    data,
  });
});

app.get("/currency", async (req, res) => {
  const response = await currencyApi();

  res.json({
    response,
  });
});

app.use("/api/exchange", exchangeRoute);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`App is on port ${PORT}`));
