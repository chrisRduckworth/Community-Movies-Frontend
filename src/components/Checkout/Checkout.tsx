import "./Checkout.css";
import { getScreening, postCheckout } from "../../utils/api";
import { MouseEventHandler, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ScreeningDetail } from "../../interfaces";
import Cost from "./Cost";
import dayjs from "dayjs";
import ErrorComp from "../Error";

function Checkout() {
  const { screening_id } = useParams();
  const [screening, setScreening] = useState<null | ScreeningDetail>(null);
  const [cost, setCost] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setError("");
    setIsLoading(true);
    if (!screening) {
      getScreening(screening_id)
        .then((screeningData) => {
          setScreening(screeningData);
          setIsLoading(false);
        })
        .catch(
          ({
            response: {
              data: { msg },
            },
          }) => {
            setIsLoading(false);
            if (msg === "Screening not found") {
              setError(msg);
            } else {
              setError("Something went wrong");
            }
          }
        );
    } else {
      setCost(screening.cost);
      setIsLoading(false);
    }
  }, [screening]);

  const handleCheckout: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setError("");
    setIsLoading(true);
    e.preventDefault();
    let url;
    try {
      url = await postCheckout(screening_id, cost);
      window.open(url, "_self");
    } catch (e) {
      setError("Checkout failed");
    }
    setIsLoading(false);
  };

  if (error && error !== "Checkout failed") {
    return <ErrorComp error={error} />;
  }

  return (
    <main>
      <Link to={`/screenings/${screening_id}`} className="return-link">
        Return to screening
      </Link>
      <div className="booking-main">
        {screening === null ? (
          <h3 className="loading">Loading...</h3>
        ) : (
          <>
            <h2>Booking Details</h2>

            <p>
              {screening.film.title} ({screening.film.year})
            </p>
            <p>{dayjs(screening.date).format("D MMMM YYYY, HH:mm")}</p>

            <div>
              {screening.location.split(",").map((line, i, arr) => {
                return (
                  <p key={line}>
                    {line}
                    {i === arr.length - 1 ? "" : ","}
                  </p>
                );
              })}
            </div>

            <Cost
              cost={cost}
              setCost={setCost}
              is_pay_what_you_want={screening.is_pay_what_you_want}
            />
            <button onClick={handleCheckout} id="checkout" disabled={isLoading}>
              Checkout
            </button>
            {error === "Checkout failed" && (
              <p className="error">Something went wrong</p>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Checkout;
