import "./checkout.styles.scss";
import { CartContext } from "../../context/cart.context";
import { useContext } from "react";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems } = useContext(CartContext);

  const calculateTotal = () => {
    let count = 0;
    cartItems.forEach((item) => {
      count += item.price * item.quantity
    });
    return count;
  }
  console.log(cartItems);
  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((item) => {
        return <CheckoutItem cartItem={item}></CheckoutItem>;
      })}
      <span className="total">Total: ${calculateTotal()}</span>
    </div>
  );
};

export default Checkout;
