import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";

const Cart = () => {
  const {
    cart,
    totalItems,
    totalQuantity,
    totalPrice,
  } = useCart();

  if (cart.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold">
          🛒 Your cart is empty
        </h2>

        <p className="text-gray-500 mt-2">
          Add some products from the Home page.
        </p>
      </div>
    );
  }

  return (
    <div>

      <div className="space-y-5">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
          />
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">

        <h2 className="text-2xl font-bold mb-4">
          Order Summary
        </h2>

        <div className="space-y-2 text-lg">
          <p>Total Products: {totalItems}</p>

          <p>Total Quantity: {totalQuantity}</p>

          <p className="font-bold text-blue-600 text-2xl">
            Total: ${totalPrice.toFixed(2)}
          </p>
        </div>

      </div>
    </div>
  );
};

export default Cart;