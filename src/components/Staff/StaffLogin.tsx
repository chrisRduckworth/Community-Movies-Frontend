import { Link } from "react-router-dom";
import "./Staff.css";
import { FormEventHandler, useState } from "react";
import { postLogin } from "../../utils/api";

function StaffLogin({
  setJwt,
}: {
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    setError("");
    setIsLoading(true);
    e.preventDefault();
    try {
      const token = await postLogin(password);
      setJwt(token);
    } catch (e: any) {
      const {
        response: {
          data: { msg },
        },
      } = e;
      setError(msg === "Password does not match" || password === "" ? "Password does not match" : "Something went wrong")
    }
    setIsLoading(false);
  };

  return (
    <>
      <Link to="/screenings" className="return-link">
        Return
      </Link>
      <div className="main-screening">
        <form onSubmit={handleSubmit} id="staff-login">
          <label htmlFor="staff-pass">Enter staff password</label>
          <input
            type="password"
            name="staff-pass"
            id="staff-pass"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" id="checkout" disabled={isLoading}>
            Submit
          </button>
          {error && <p>{error}</p>}
        </form>
      </div>
    </>
  );
}

export default StaffLogin;
