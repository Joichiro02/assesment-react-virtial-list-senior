import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="text-center mt-2">
      <Link to="/" className="p-3">
        Home
      </Link>
      <Link to="/list" className="p-3">
        List
      </Link>
      <Link to="/about" className="p-3">
        About
      </Link>
    </nav>
  );
};

export default Navbar;
