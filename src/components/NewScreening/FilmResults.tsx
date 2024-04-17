import { NewScreeningForm, Result } from "../../interfaces";
import { FaCheck } from "react-icons/fa6";
import "./NewScreening.css";
import React, { MouseEventHandler, useEffect, useState } from "react";

function FilmResults({
  results,
  setForm,
}: {
  results: Result[];
  setForm: React.Dispatch<React.SetStateAction<NewScreeningForm>>;
}) {
  const [chosen, setChosen] = useState(0);

  useEffect(() => {
    if (results.length > 0) {
      setChosen(results[0].tmdb_id);
    }
  }, [results]);

  const handleChooseResult: MouseEventHandler<HTMLButtonElement> = async (
    e
  ) => {
    e.preventDefault();
    setForm((f) => {
      const newForm = JSON.parse(JSON.stringify(f));
      newForm.tmdb_id = chosen;
      return newForm;
    });
  };

  return (
    <>
      <label htmlFor="results">Results</label>
      <div id="results-container">
        <select
          name="results"
          id="results"
          disabled={results.length === 0}
          value={chosen}
          onChange={(e) => setChosen(parseInt(e.target.value))}
        >
          {results.length === 0 ? (
            <option value={0}>---</option>
          ) : (
            results.map((res) => {
              return (
                <option key={res.tmdb_id} value={res.tmdb_id}>
                  {res.title} ({res.year})
                </option>
              );
            })
          )}
        </select>
        <div className="button-on-end">
          <button
            id="result-button"
            disabled={results.length === 0}
            onClick={handleChooseResult}
          >
            <FaCheck />
          </button>
        </div>
      </div>
    </>
  );
}

export default FilmResults;
