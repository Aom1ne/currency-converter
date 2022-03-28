function CurrencyInput(props) {
  return (
    <div className="converter">
      <input
        type="number"
        value={props.amount}
        onChange={(event) => props.onAmountChange(event.target.value)}
      />
      <select
        value={props.currency}
        onChange={(e) => props.onCurrencyChange(e.target.value)}
      >
        {props.currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
}

export { CurrencyInput };
