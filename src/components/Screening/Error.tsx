import { Link } from "react-router-dom";

function ErrorComp({ error }: { error: string }) {
  return (
    <main>
      <Link to="/screenings" className="return-link">
        Return to screenings
      </Link>
      <div className="main-screening">
        <p className="error">
          {error === "Screening not found" ? error : "Something went wrong"}
        </p>
      </div>
    </main>
  );
}

export default ErrorComp;
