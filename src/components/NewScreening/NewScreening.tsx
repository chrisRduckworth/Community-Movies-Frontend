import { Link } from "react-router-dom";
import "./NewScreening.css";
import { useState } from "react";
import { NewScreeningForm } from "../../interfaces";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

function NewScreening({ jwt }: { jwt: string }) {
  const [form, setForm] = useState<NewScreeningForm>({
    title: "",
    date: "",
    streetAddress: "",
    postCode: "",
    city: "",
    isPayWhatYouWant: false,
    cost: 0,
    value: "",
  });

  if (!jwt) {
    return (
      <main>
        <Link to="/staff" className="return-link">
          Staff Login
        </Link>
        <div className="main-screening">You are not logged in</div>
      </main>
    );
  }

  const handleFormChange = (name: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((f) => {
        const newForm = JSON.parse(JSON.stringify(f));
        if (e.target.type === "checkbox") {
          newForm.isPayWhatYouWant = e.target.checked;
        } else {
          newForm[name] = e.target.value;
        }
        return newForm;
      });
    };
  };

  const handleCostChange: CurrencyInputProps["onValueChange"] = (
    value,
    _name,
    _values
  ) => {
    setForm((f) => {
      const newForm = JSON.parse(JSON.stringify(f));
      if (!value) {
        newForm.value = "";
        newForm.cost = 0;
      } else {
        newForm.value = value;
        newForm.cost = Math.floor(parseFloat(value) * 100);
      }
      return newForm;
    });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }

  return (
    <main>
      <Link to="/staff" className="return-link">
        Return to staff page
      </Link>
      <div className="main-screening">
        <h2>New Screening</h2>
        <div id="form-container">
          <form id="new-screening-form" onSubmit={handleSubmit}>
            <label htmlFor="title">Film</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              value={form.title}
              onChange={handleFormChange("title")}
            />
            <label htmlFor="date">Date</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={form.date}
              onChange={handleFormChange("date")}
            />
            <label htmlFor="street-address">Street address</label>
            <input
              type="text"
              name="streetAddress"
              id="street-address"
              placeholder="221B Baker Street"
              value={form.streetAddress}
              onChange={handleFormChange("streetAddress")}
            />
            <label htmlFor="post-code">Post code</label>
            <input
              type="text"
              name="postCode"
              id="post-code"
              placeholder="NW1 6XE"
              value={form.postCode}
              onChange={handleFormChange("postCode")}
            />
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="London"
              value={form.city}
              onChange={handleFormChange("city")}
            />

            <label htmlFor="cost" id="cost-label">
              Cost
            </label>
            <CurrencyInput
              id="cost"
              prefix={"£"}
              step={1}
              placeholder="£0.00"
              allowNegativeValue={false}
              fixedDecimalLength={2}
              value={form.value}
              onValueChange={handleCostChange}
            />
            <div id="pwyw-container">
              <label htmlFor="pwyw">Pay what you want?</label>
              <input
                type="checkbox"
                name="isPayWhatYouWant"
                id="pwyw"
                onChange={handleFormChange("isPayWhatYouWant")}
                checked={form.isPayWhatYouWant}
              />
            </div>
            <div id="button-container">
              <button id="checkout" type="submit">Create Screening</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default NewScreening;
