import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({
  customerName: "",
  phone: "",
  tableNumber: "",
});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setDetails({
      customerName: user?.name || "",
      phone: user?.phone || "",
      location: "",
    });

    const storedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(storedCart);

  }, []);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {

    if (!details.tableNumber) {
  alert("Enter Table Number");
  return;
}

    setLoading(true);

    try {

      for (const item of cart) {

        await API.post("/orders", {
  foodId: item._id,
  quantity: item.quantity,
  tableNumber: details.tableNumber,
});

      }

      alert("Order Placed Successfully");

      localStorage.removeItem("cart");

      navigate("/orders");

    } catch (err) {

      alert(err.response?.data?.message || "Order Failed");

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="checkout">

      <h1>🍔 Checkout</h1>

      <div className="checkout-box">

        <div className="customer">

          <h2>Customer Details</h2>

          <input
            type="text"
            name="customerName"
            placeholder="Name"
            value={details.customerName}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={details.phone}
            onChange={handleChange}
          />

          <input
  type="text"
  name="tableNumber"
  placeholder="Enter Table Number"
  value={details.tableNumber}
  onChange={handleChange}
/>
        </div>

        <div className="summary">

          <h2>Order Summary</h2>

          {cart.map(item => (

            <div
              className="summary-item"
              key={item._id}
            >

              <span>
                {item.name} × {item.quantity}
              </span>

              <span>
                ₹ {item.price * item.quantity}
              </span>

            </div>

          ))}

          <hr />

          <h2>Total : ₹ {total}</h2>

          <button
            onClick={placeOrder}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default Checkout;