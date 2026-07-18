import { useState, useEffect } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/Cart.css";

function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    updateCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cart];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      updateCart(updatedCart);
    }
  };

  const removeItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    updateCart(updatedCart);
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const checkout = () => {
  console.log("Checkout button clicked");
  console.log(cart);

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  navigate("/checkout");
};

  return (
    <div className="cart-page">

      <h1>🛒 My Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>

              <img
                src={item.image}
                alt={item.name}
              />

              <div className="cart-details">

                <h2>{item.name}</h2>

                <p>{item.description}</p>

                <h3>₹ {item.price}</h3>

              </div>

              <div className="quantity">

                <button
                  onClick={() => decreaseQuantity(index)}
                >
                  <FaMinus />
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(index)}
                >
                  <FaPlus />
                </button>

              </div>

              <button
                className="delete"
                onClick={() => removeItem(index)}
              >
                <FaTrash />
              </button>

            </div>
          ))}

          <div className="cart-footer">

            <h2>Total : ₹ {totalAmount}</h2>

            <button
  className="checkout-btn"
  onClick={checkout}
>
  Proceed To Checkout
</button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;