import { MouseEventHandler } from "react";
import { Link } from "react-router-dom";

function StaffMenu({
  setJwt,
}: {
  setJwt: React.Dispatch<React.SetStateAction<string>>;
}) {
  const logout: MouseEventHandler<HTMLAnchorElement> = () => {
    setJwt("");
  };
  return (
    <>
      <Link to="/screenings" className="return-link" onClick={logout}>
        Log out
      </Link>
      <div className="main-screening">
        <ul id="staff-options">
          <li>
            <p>Add new screening</p>
            <Link to="/staff/screenings/new">+</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default StaffMenu;
