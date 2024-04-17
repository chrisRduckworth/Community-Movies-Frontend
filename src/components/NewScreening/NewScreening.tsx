import { Link } from "react-router-dom";
import "./NewScreening.css";
import { useState } from "react";
import { NewScreeningForm, PostScreening } from "../../interfaces";
import CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";
import FilmSearch from "./FilmSearch";
import { postScreening } from "../../utils/api";
import Success from "./Success";

function NewScreening({ jwt }: { jwt: string }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [screening, setScreening] = useState<PostScreening | null>(null);

  const [form, setForm] = useState<NewScreeningForm>({
    tmdb_id: 0,
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

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    if (form.tmdb_id === 0) {
      setError("Please search and choose a film");
    } else if (form.isPayWhatYouWant && form.cost > 0) {
      setError(
        "Cost cannot be greater than 0 when Pay What You Want is selected"
      );
    } else {
      try {
        const screeningData = await postScreening(form, jwt);
        setScreening(screeningData);
      } catch {
        setError("Something went wrong");
      }
    }
    setIsSubmitting(false);
  };

  return (
    <main>
      <Link to="/staff" className="return-link">
        Return to staff page
      </Link>
      <div className="main-screening">
        <h2>New Screening</h2>
        <div id="form-container">
          <form id="new-screening-form" onSubmit={handleSubmit}>
            <FilmSearch form={form} setForm={setForm} jwt={jwt} />
            <label htmlFor="date">Date</label>
            <input
              type="datetime-local"
              name="date"
              id="date"
              value={form.date}
              onChange={handleFormChange("date")}
              required={true}
            />
            <label htmlFor="street-address">Street address</label>
            <input
              type="text"
              name="streetAddress"
              id="street-address"
              placeholder="221B Baker Street"
              value={form.streetAddress}
              onChange={handleFormChange("streetAddress")}
              required={true}
            />
            <label htmlFor="post-code">Post code</label>
            <input
              type="text"
              name="postCode"
              id="post-code"
              placeholder="NW1 6XE"
              value={form.postCode}
              onChange={handleFormChange("postCode")}
              required={true}
            />
            <label htmlFor="city">City</label>
            <input
              type="text"
              name="city"
              id="city"
              placeholder="London"
              value={form.city}
              onChange={handleFormChange("city")}
              required={true}
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
              value={form.value}
              onValueChange={handleCostChange}
              required={true}
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
              <button id="checkout" type="submit">
                Create Screening
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default NewScreening;
