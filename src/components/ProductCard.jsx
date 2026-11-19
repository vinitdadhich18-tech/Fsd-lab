import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const {
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    getQuantity,
  } = useCart();

  const quantity = getQuantity(product.id);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-5 flex flex-col">
      <img
        src={product.image}
        alt={product.title}
        className="h-48 object-contain mb-4"
      />

      <h2 className="font-semibold line-clamp-2 h-12">
        {product.title}
      </h2>

      <p className="text-blue-600 font-bold text-lg mt-2">
        ${product.price}
      </p>

      <p className="text-gray-500 text-sm capitalize">
        {product.category}
      </p>

      <div className="mt-auto pt-5">
        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product)}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => decreaseQuantity(product.id)}
              className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              -
            </button>

            <span className="text-xl font-semibold">
              {quantity}
            </span>

            <button
              onClick={() => increaseQuantity(product.id)}
              className="w-10 h-10 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;