import { useEffect, useState } from "react";
import { ScreeningOverview } from "../../interfaces";
import { getScreenings } from "../../utils/api";
import ScreeningCard from "./ScreeningCard";

function Screenings() {
  const [screenings, setScreenings] = useState<ScreeningOverview[]>([]);
  useEffect(() => {
    getScreenings().then((screeningsData) => setScreenings(screeningsData));
  }, []);

  return (
    <main>
      <h2>Screenings</h2>
        {screenings.map((screening) => (
          <ScreeningCard key={screening.screening_id} screening={screening} />
        ))}
    </main>
  );
}

export default Screenings;
