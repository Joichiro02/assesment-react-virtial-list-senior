// ** libraries imports
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// ** local imports
import { selectCartItems } from "../features/cartSlice";
import { Stack } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import CartItem from "./Modal/CartItem";
import { useState } from "react";

const Navbar = () => {
  // ** state
  const [open, setOpen] = useState<boolean>(false);

  // ** cart selectors
  const cartItems = useSelector(selectCartItems);

  // ** auth
  const { isAuthenticated } = useAuth0();

  // ** open modal
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div className="flex flex-row flex-1 h-12 mb-3 bg-blue-500 items-center justify-between px-8">
        <nav className="flex items-center">
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
        {isAuthenticated ? (
          <span className="relative">
            {cartItems.length !== 0 && (
              <span className="absolute flex -top-1 -right-4 bg-orange-600 rounded-full h-5 w-5 items-center justify-center">
                {cartItems.length}
              </span>
            )}

            <ShoppingCartIcon
              className="hover:cursor-pointer"
              onClick={handleOpen}
            />
          </span>
        ) : null}
      </div>
      <CartItem open={open} setOpen={setOpen} />
    </>
  );
};

export default Navbar;
