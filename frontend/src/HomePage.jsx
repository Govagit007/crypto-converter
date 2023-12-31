import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

const HomePage = () => {
  const [coins, setCoins] = useState([]);
  const [currencies, setCurrencies] = useState([]);

  const [selectedCoin, setSelectedCoin] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const [number, setNumber] = useState(1);

  const [ans, setAns] = useState(0);

  const [error, setError] = useState(false);

  const options = coins.map((c) => ({
    value: c,
    label: (
      <div className="flex gap-2 items-center justify-start p-3">
        <img src={c.iconUrl} alt={c.name} className="w-6 h-6" />
        <h1>{c.name}</h1>
      </div>
    ),
  }));

  const options2 = currencies.map((c) => ({
    value: c,
    label: (
      <div className="flex gap-2 items-center justify-start p-3">
        <h1>{c.id}</h1>
        <h1>{c.symbol}</h1>
      </div>
    ),
  }));

  const handleCurrency = (e) => {
    setSelectedCurrency(e);
    console.log(e);
  };

  const handleCoin = (e) => {
    setSelectedCoin(e);
    console.log(e);
  };

  const handleExchange = (e) => {
    e.preventDefault();
    let value =
      selectedCoin.value.price *
      (selectedCurrency ? selectedCurrency.value.price : 1);
    value = value * number;
    value = value.toFixed(6);
    setAns(value);
  };

  const handleNumber = (e) => {
    const num = e.target.value;
    if (num < 0) {
      setError("Enter valid Number");
      return;
    }
    setError();
    setNumber(num);
    let value =
      selectedCoin.value.price *
      (selectedCurrency ? selectedCurrency.value.price : 1);
    value = value * num;
    let newAns = value.toFixed(6);

    setAns(newAns);
  };

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(
          "https://crypto-server-jj5y.onrender.com/coins"
        );
        const response = await axios.get(
          "https://crypto-server-jj5y.onrender.com/currency"
        );
        let res = response.data.response;

        setCurrencies(res);
        setCoins(
          data.data.sort((a, b) => {
            const nameA = a.name.toLowerCase();
            const nameB = b.name.toLowerCase();

            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            return 0;
          })
        );
      } catch (error) {
        console.error("Error fetching coins:", error);
      }
    };

    fetchCoins();
  }, []);

  return (
    <div
      className="w-full h-screen flex justify-center items-center"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8hyHgI5682LGeCnY1kqA6mlY2-qo0D7G3LA&usqp=CAU')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {error && (
        <div className="absolute top-10 bg-red-300 p-8 text-red-500 text-2xl transition shadow border bg-opacity-70">
          {error}
        </div>
      )}
      <div className="md:w-3/5 w-full md:h-4/5 h-full flex flex-col justify-start gap-10 shadow-2xl shadow-slate-800 bg-neutral-100 p-4 border md:p-10 items-center   rounded">
        <h1 className="text-3xl font-bold text-slate-400 ">
          DIGITAL CURRENCY EXCHANGE
        </h1>
        <div className="w-full">
          <form className="flex flex-col gap-6 md:gap-10 justify-center items-center">
            <div className="w-full flex flex-col gap-4 justify-around ">
              <label htmlFor="coin" className="text-base">
                {" "}
                Select Crypto Coin
              </label>
              <div className="w-full flex flex-col gap-8 md:flex-row justify-between">
                <Select
                  options={options}
                  id="coin"
                  value={selectedCoin}
                  onChange={handleCoin}
                  placeholder="Select a coin"
                  className=" md:w-1/3 w-full "
                />

                <input
                  type="number"
                  id=""
                  className="border shadow-md w-full md:w-1/3 p-3 h-[50px]"
                  min={1}
                  onChange={handleNumber}
                  placeholder="Number of coins"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={handleExchange}
              className="px-6 py-3 hover:scale-95 transition md:w-[300px] text-2xl bg-neutral-800 text-neutral-50 rounded-full "
            >
              Exchange
            </button>

            <div className="w-full gap-6 md:10 flex justify-center items-center h-[60px]">
              <div className="text-5xl font-bold">
                <span className="m-4">{selectedCurrency?.value.symbol}</span>
                {ans}
              </div>
              <Select
                options={options2}
                value={selectedCurrency}
                onChange={handleCurrency}
                placeholder="USD $"
                className="w-1/3"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
