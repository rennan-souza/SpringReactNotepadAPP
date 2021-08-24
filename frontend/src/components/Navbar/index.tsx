import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <Link className="navbar-brand" to="/home">NotepadAPP</Link>
            <div className="ml-auto">
                <Link to="/auth/signup" className="btn btn-sm btn-primary mr-1">CRIAR CONTA</Link>
                <Link to="/auth/signin" className="btn btn-sm btn-outline-primary">LOGIN</Link>
            </div>
        </nav>
    )
}

export default Navbar;