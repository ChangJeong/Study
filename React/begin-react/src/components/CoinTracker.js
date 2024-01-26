import { useState, useEffect } from "react";

function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const [money, setMoney] = useState(0);

  const onChange = (e) => {
    setMoney(e.target.value);
  };

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
      });
    setLoading(false);
  }, []);
  console.log(coins[0]);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `${coins.length}`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <br />
      <h1>How Many You Can Buy BTC!</h1>
      <input
        onChange={onChange}
        value={money}
        type="number"
        placeholder="How many have you money?"
      />
      <br />
      <br />
      {money ? <span> {money / coins[0].quotes.USD.price} BTC</span> : ""}
    </div>
  );
}

export default CoinTracker;
