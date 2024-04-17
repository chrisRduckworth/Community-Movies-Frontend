import dayjs from "dayjs";
import { PostScreening } from "../../interfaces";
import { Link } from "react-router-dom";

function Success({ screening }: { screening: PostScreening }) {
  return (
    <div id="create-screening-success">
      <h2>Screening created</h2>
      <p>Screening ID: {screening.screening_id}</p>
      <p>
        Title: {screening.film.title} ({screening.film.year})
      </p>
      <p>Date: {dayjs(screening.date).format("D MMMM YYYY, HH:mm")}</p>
      <p>
        Cost:{" "}
        {(screening.cost / 100).toLocaleString("en-UK", {
          style: "currency",
          currency: "GBP",
        })}
      </p>
      <p>Location: {screening.location}</p>
      <div id="test">
        <Link to={`/screenings/${screening.screening_id}`} id="checkout">
          View Screening
        </Link>
      </div>
    </div>
  );
}

export default Success;
