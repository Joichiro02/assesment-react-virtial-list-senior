import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex h-12 mb-3 bg-blue-500">
      <Link to="/" className="p-3 hover:text-black">
        Home
      </Link>
      <Link to="/list" className="p-3 hover:text-black">
        List
      </Link>
      <Link to="/about" className="p-3 hover:text-black">
        About
      </Link>
    </nav>
  );
};

export default Navbar;
