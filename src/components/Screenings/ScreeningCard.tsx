import "./ScreeningCard.css";
import dayjs from "dayjs";
import { ScreeningOverview } from "../../interfaces";
import { Link } from "react-router-dom";

function ScreeningCard({ screening }: { screening: ScreeningOverview }) {
  const location = screening.location.split(",");
  const cost = (screening.cost / 100).toLocaleString("en-UK", {
    style: "currency",
    currency: "GBP",
  });

  return (
    <div className="screening-card-container">
      <section className="screening-card">
        <h3>
          <Link to={`/screenings/${screening.screening_id}`}>
            {screening.film.title} ({screening.film.year})
          </Link>
        </h3>
        <div className="screening-card-info">
          <div className="screening-card-details">
            <p>{dayjs(screening.date).format("DD/MM/YY HH:mm")}</p>
            <p>{screening.is_pay_what_you_want ? "Pay what you want" : cost}</p>
            <div className="screening-card-info-location">
              {location.map((line, i) => (
                <p key={line}>
                  {line}
                  {i === location.length - 1 ? "" : ","}
                </p>
              ))}
            </div>
            <Link
              to={
                screening.is_pay_what_you_want
                  ? `/screenings/${screening.screening_id}`
                  : `/screenings/${screening.screening_id}/book`
              }
              className="screening-card-book"
            >
              Book
            </Link>
          </div>
          <img
            src={screening.film.poster_url}
            alt={`${screening.film.title} poster`}
          />
        </div>
      </section>
    </div>
  );
}

export default ScreeningCard;
