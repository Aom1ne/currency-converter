import { CurrencyInput } from "./components/CurrencyInput";
import { SwapButton } from "./components/SwapButton";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [amount1, setAmount1] = useState(1);
  const [amount2, setAmount2] = useState(1);
  const [currency1, setCurrency1] = useState("USD");
  const [currency2, setCurrency2] = useState("BYN");
  const [rates, setRates] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://data.fixer.io/api/latest?access_key=dad17810cd20ba2cf980f43ed73098b7`
      )
      .then((response) => {
        setRates(response.data.rates);
      });
  }, []);

  useEffect(() => {
    if (!!rates) {
      handleAmount1Change(1);
    }
  }, [rates]);

  const handleAmount1Change = (amount1) => {
    if (amount1 === "") {
      setAmount2(amount1);
    } else {
      setAmount2(((amount1 * rates[currency2]) / rates[currency1]).toFixed(4));
    }
    setAmount1(amount1);
  };

  const handleCurrency1Change = (currency1) => {
    setAmount2(((amount1 * rates[currency2]) / rates[currency1]).toFixed(4));
    setCurrency1(currency1);
  };

  const handleAmount2Change = (amount2) => {
    if (amount2 === "") {
      setAmount2(amount1);
    } else {
      setAmount1(((amount2 * rates[currency1]) / rates[currency2]).toFixed(4));
    }
    setAmount2(amount2);
  };

  const handleCurrency2Change = (currency2) => {
    setAmount1(((amount2 * rates[currency1]) / rates[currency2]).toFixed(4));
    setCurrency2(currency2);
  };

  const handleSwapCurrencies = () => {
    setCurrency1(currency2);
    setCurrency2(currency1);
    setAmount1(amount2);
    setAmount2(amount1);
  };

  return (
    <div>
      <h1>Exchange money</h1>
      <CurrencyInput
        onAmountChange={handleAmount1Change}
        onCurrencyChange={handleCurrency1Change}
        currencies={Object.keys(rates)}
        amount={amount1}
        currency={currency1}
      />
      <CurrencyInput
        onAmountChange={handleAmount2Change}
        onCurrencyChange={handleCurrency2Change}
        currencies={Object.keys(rates)}
        amount={amount2}
        currency={currency2}
      />
      <div className="info">
        <span>Current rate: {(rates[currency2] / rates[currency1]).toFixed(4)}</span>
        <SwapButton func={handleSwapCurrencies} />
      </div>
    </div>
  );
}

export default App;
