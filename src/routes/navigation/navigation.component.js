import { async } from "@firebase/util";
import { doc, getDoc } from "firebase/firestore";
import { Fragment, useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import { CartContext } from "../../context/cart.context";
import { UserContext } from "../../context/user.context";
import { db, signOutUser } from "../../utils/firebase/fierbase.utils";
import "./navigation.styles.scss";

const Navigation = () => {
  const { currentUser, name } = useContext(UserContext);
  const { isCartOpen, clearAllCartItems } = useContext(CartContext);

  const signOutHandler = () => {
    signOutUser();
    clearAllCartItems();
    window.location.href = "/";
  }

  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <CrwnLogo className="logo"></CrwnLogo>
        </Link>

        <div className="nav-links-container">
          {currentUser && (
            <Link className="nav-link" to="/shop">
              SHOP
            </Link>
          )}

          {currentUser ? (
            <div>
              <span>Welcome : {name}</span>
              <span className="nav-link" onClick={signOutHandler}>
                SIGN OUT
              </span>
            </div>
          ) : (
            <Link className="nav-link" to="/">
              SIGN IN
            </Link>
          )}
          {currentUser && <CartIcon></CartIcon>}
        </div>
        {isCartOpen && <CartDropdown></CartDropdown>}
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
