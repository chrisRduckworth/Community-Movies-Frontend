import { useEffect, useState } from "react";
import { ScreeningOverview } from "../../interfaces";
import { getScreenings } from "../../utils/api";
import ScreeningCard from "./ScreeningCard";

function Screenings() {
  const [screenings, setScreenings] = useState<ScreeningOverview[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    getScreenings()
      .then((screeningsData) => {
        setIsLoading(false);
        setScreenings(screeningsData);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  return (
    <main>
      <div className="screenings-main">
        <h2 id="screenings-title">Screenings</h2>
        {isLoading ? (
          <h3 className="loading">Loading...</h3>
        ) : isError ? (
          <p className="error">Something went wrong</p>
        ) : (
          screenings.map((screening) => (
            <ScreeningCard key={screening.screening_id} screening={screening} />
          ))
        )}
      </div>
    </main>
  );
}

export default Screenings;
