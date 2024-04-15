import "./Header.css"
import { Link } from "react-router-dom"

function Header() {
    return (
        <header>
            <Link to ="/">
                <h1>Community Movies</h1>
            </Link>
        </header>
    )
}

export default Header