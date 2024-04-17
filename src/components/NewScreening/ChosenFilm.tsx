import { MouseEventHandler } from "react";
import { NewScreeningForm, Result } from "../../interfaces";
import { MdOutlineCancel } from "react-icons/md";

function ChosenResult({
  results,
  form,
  setResults,
  setForm,
}: {
  results: Result[];
  form: NewScreeningForm;
  setResults: React.Dispatch<React.SetStateAction<Result[]>>;
  setForm: React.Dispatch<React.SetStateAction<NewScreeningForm>>;
}) {
  const handleCancel: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setResults([]);
    setForm((f) => {
      const newForm = JSON.parse(JSON.stringify(f));
      newForm.tmdb_id = 0;
      return newForm;
    });
  };

  return (
    <>
      <label htmlFor="film">Film</label>
      <div className="film-container">
        <input
          type="text"
          disabled={true}
          value={results.find((r) => r.tmdb_id === form.tmdb_id)!.title}
        />
        <div className="button-on-end">
          <button id="cancel" onClick={handleCancel}>
            <MdOutlineCancel />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChosenResult;
