import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getScreening } from "../../utils/api";
import { ScreeningDetail } from "../../interfaces";
import "./Screening.css";
import dayjs from "dayjs";
import Cost from "./Cost";

function Screening({ cost, setCost }: { cost: number; setCost: any }) {
  const { screening_id } = useParams();
  const [screening, setScreening] = useState<null | ScreeningDetail>(null);

  useEffect(() => {
    getScreening(screening_id).then((screeningData) => {
      setScreening(screeningData);
      setCost(screeningData.cost);
    });
  }, []);

  return screening === null ? (
    <p>Loading</p>
  ) : (
    <>
      <main>
        <Link to="/screenings" className="return-link">
          Return to screenings
        </Link>
        <div className="main-screening">
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
                  <Cost
                    cost={cost}
                    setCost={setCost}
                    is_pay_what_you_want={screening.is_pay_what_you_want}
                  />
                  <h4>Date</h4>
                  <p>{dayjs(screening.date).format("D MMMM YYYY, HH:mm")}</p>
                </div>
                <div id="location">
                  <h4>Location</h4>
                  {screening.location.split(",").map((line, i) => (
                    <p key={line}>
                      {line}
                      {i === screening.location.split(",").length - 1
                        ? ""
                        : ","}
                    </p>
                  ))}
                </div>
              </div>
              <Link to={`/screening/${screening_id}/book`} id="book-link">
                Book
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Screening;
