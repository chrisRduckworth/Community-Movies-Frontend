import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import { useState } from "react";

function Cost({
  cost,
  setCost,
  is_pay_what_you_want,
}: {
  cost: number;
  setCost: React.Dispatch<React.SetStateAction<number>>;
  is_pay_what_you_want: boolean;
}) {
  const [value, setValue] = useState<string | number>(0);

  const handleValueChange: CurrencyInputProps["onValueChange"] = (
    value,
    name,
    values
  ) => {
    if (value) {
      setCost(Math.floor(parseFloat(value) * 100));
      setValue(value);
    }
  };

  return is_pay_what_you_want ? (
    <>
      <label htmlFor="cost-input">
        <h4>Cost</h4>
      </label>
      <CurrencyInput
        id="cost-input"
        value={value}
        onValueChange={handleValueChange}
        placeholder="0.00"
        prefix={"£"}
        step={1}
      />
    </>
  ) : (
    <>
      <h4>Cost</h4>
      <p>
        {(cost / 100).toLocaleString("en-UK", {
          style: "currency",
          currency: "GBP",
        })}
      </p>
    </>
  );
}

export default Cost;
