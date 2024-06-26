import { useState } from "react";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

function Cost({
  cost,
  setCost,
  is_pay_what_you_want,
}: {
  cost: number;
  setCost: React.Dispatch<React.SetStateAction<number>>;
  is_pay_what_you_want: boolean;
}) {
  const [value, setValue] = useState("");

  const handleValueChange: CurrencyInputProps["onValueChange"] = (
    value,
    _name,
    _values
  ) => {
    if (!value) {
      setValue("");
      setCost(0);
    } else {
      setValue(value);
      setCost(Math.floor(parseFloat(value) * 100));
    }
  };

  return is_pay_what_you_want ? (
    <div id="checkout-pwyw">
      <label htmlFor="cost-input">Pay what you want:</label>
      <CurrencyInput
        id="cost-input"
        placeholder="Enter optional fee"
        prefix={"£"}
        step={1}
        allowNegativeValue={false}
        value={value}
        onValueChange={handleValueChange}
      />
    </div>
  ) : (
    <p>
      {(cost / 100).toLocaleString("en-UK", {
        style: "currency",
        currency: "GBP",
      })}
    </p>
  );
}

export default Cost;
