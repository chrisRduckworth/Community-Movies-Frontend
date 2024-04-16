import "./Footer.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();

  if (!/\/staff/.test(location.pathname)) {
    return (
      <footer>
        <Link to="/staff">Staff</Link>
      </footer>
    );
  }
}

export default Footer;
