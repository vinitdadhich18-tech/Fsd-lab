import { useCart } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className="bg-white rounded-xl shadow p-5 flex gap-6 items-center">

      <img
        src={item.image}
        alt={item.title}
        className="w-24 h-24 object-contain"
      />

      <div className="flex-1">
        <h2 className="font-semibold">
          {item.title}
        </h2>

        <p className="text-blue-600 font-bold mt-2">
          ${item.price}
        </p>

        <p className="text-gray-600 mt-1">
          Subtotal: ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => decreaseQuantity(item.id)}
          className="w-9 h-9 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          -
        </button>

        <span className="font-bold text-lg">
          {item.quantity}
        </span>

        <button
          onClick={() => increaseQuantity(item.id)}
          className="w-9 h-9 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;