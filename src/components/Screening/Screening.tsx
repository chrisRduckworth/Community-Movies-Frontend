import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getScreening } from "../../utils/api";
import { ScreeningDetail } from "../../interfaces";
import "./Screening.css";
import dayjs from "dayjs";
import ErrorComp from "./Error";

function Screening() {
  const { screening_id } = useParams();
  const [screening, setScreening] = useState<null | ScreeningDetail>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
    setScreening(null);
    getScreening(screening_id)
      .then((screeningData) => {
        setScreening(screeningData);
      })
      .catch(
        ({
          response: {
            data: { msg },
          },
        }) => {
          console.log("in catch")
          if (msg === "Screening not found") {
            setError(msg);
          } else {
            setError("Something went wrong");
          }
        }
      );
  }, []);

  if (error) {
    return <ErrorComp error={error} />;
  }

  return (
    <main>
      <Link to="/screenings" className="return-link">
        Return to screenings
      </Link>
      <div className="main-screening">
        {screening === null ? (
          <h3 className="loading">Loading</h3>
        ) : (
          <div id="screening">
            <img
              src={screening.film!.backdrop_url}
              alt={`${screening.film!.title} backdrop`}
              id="backdrop"
            />
            <h2>
              {screening.film.title} ({screening.film.year})
            </h2>
            <p>{screening.film.description}</p>
            <div id="screening-details-container">
              <div id="screening-details">
                <div id="screening-details-cd">
                  <h4>Cost</h4>
                  <p>
                    {screening.is_pay_what_you_want
                      ? "Pay what you want"
                      : (screening.cost / 100).toLocaleString("en-UK", {
                          style: "currency",
                          currency: "GBP",
                        })}
                  </p>
                  <h4>Date</h4>
                  <p>{dayjs(screening.date).format("D MMMM YYYY, HH:mm")}</p>
                </div>
                <div id="location">
                  <h4>Location</h4>
                  {screening.location.split(",").map((line, i, arr) => (
                    <p key={line}>
                      {line}
                      {i === arr.length - 1 ? "" : ","}
                    </p>
                  ))}
                </div>
              </div>
              <Link to={`/screenings/${screening_id}/book`} id="book-link">
                Book
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Screening;
