const axios = require("axios");
const data = require("./data/data");

const coinApi = async (resolve, reject) => {
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": "d339f4610amsh651e48d48eb8124p1b16dcjsndfe50cc4479a",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data.coins;
  } catch (error) {
    console.error(error.message);
  }
};

const currencyApi = async (resolve, reject) => {
  return data;
};

module.exports = { coinApi, currencyApi };
