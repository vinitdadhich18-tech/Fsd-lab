import { useCart } from "../context/CartContext";

const Navbar = ({ page, setPage }) => {
  const { totalQuantity } = useCart();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        <h1
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => setPage("home")}
        >
          ShopEasy
        </h1>

        <div className="flex gap-8 items-center">

          <button
            onClick={() => setPage("home")}
            className={`font-medium transition ${
              page === "home"
                ? "text-blue-600"
                : "hover:text-blue-500"
            }`}
          >
            Home
          </button>

          <button
            onClick={() => setPage("cart")}
            className={`relative font-medium transition ${
              page === "cart"
                ? "text-blue-600"
                : "hover:text-blue-500"
            }`}
          >
            Cart

            {totalQuantity > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQuantity}
              </span>
            )}
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;