import React, { MouseEventHandler, useState } from "react";
import { NewScreeningForm, Result } from "../../interfaces";
import { IoSearch } from "react-icons/io5";
import { getFilms } from "../../utils/api";

import FilmResults from "./FilmResults";
import ChosenResult from "./ChosenFilm";

function FilmSearch({
  form,
  setForm,
  jwt,
}: {
  form: NewScreeningForm;
  setForm: React.Dispatch<React.SetStateAction<NewScreeningForm>>;
  jwt: string;
}) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSearch: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    setResults([]);
    setIsError(false);
    setIsLoading(true);
    try {
      const results = await getFilms(search, jwt);
      setResults(results);
    } catch {
      setIsError(true);
    }
    setIsLoading(false);
  };

  return form.tmdb_id === 0 ? (
    <>
      <label htmlFor="title">Film Search</label>
      <div className="film-container">
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isLoading}
        />
        <div className="button-on-end">
          <button id="search" onClick={handleSearch} disabled={isLoading}>
            <IoSearch />
          </button>
        </div>
      </div>
      {isError && <p>Search failed</p>}
      <FilmResults results={results} setForm={setForm} />
    </>
  ) : (
    <ChosenResult results={results} form={form} setResults={setResults} setForm={setForm}/>
  );
}

export default FilmSearch;
