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
  const handleValueChange: CurrencyInputProps["onValueChange"] = (
    value,
    name,
    values
  ) => {
    if (values && values.float) {
      setCost(Math.floor(values.float * 100));
    } else {
      setCost(0);
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
        onValueChange={handleValueChange}
        fixedDecimalLength={2}
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
