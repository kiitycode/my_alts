import React, { useState, useRef, useEffect } from "react";
import logo from "../assets/logo.svg";
import iconMenu from "../assets/iconMenu.svg";
import iconClose from "../assets/iconClose.svg";
import iconCart from "../assets/iconCart.svg";
import iconDelete from "../assets/iconDelete.svg";
import imageAvatar from "../assets/imageAvatar.png";
import { useCart } from "../context/CartContext";

const NavItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <li
    className={`relative pb-6 text-gray-600 hover:text-gray-900 cursor-pointer
                after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-1
                after:h-[3px] after:bg-orange-500 after:scale-x-0 hover:after:scale-x-100
                after:origin-left after:transition-transform ${className || ""}`}
  >
    {children}
  </li>
);

const Navbar: React.FC = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const { items, totalQty, totalPrice, remove } = useCart();

  const cartRef = useRef<HTMLDivElement>(null);

  // Outside click handler for cart
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setOpenCart(false);
      }
    }
    if (openCart) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openCart]);

  return (
    <header className="w-full bg-white relative z-30">
      <nav className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        {/* Left: menu + logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setOpenMenu(true)}
            className="md:hidden"
            aria-label="open menu"
          >
            <img src={iconMenu} alt="menu" className="w-6 h-6" />
          </button>
          <img src={logo} alt="sneakers logo" className="h-6 md:h-7" />
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex gap-8">
          <NavItem>Collections</NavItem>
          <NavItem>Men</NavItem>
          <NavItem>Women</NavItem>
          <NavItem>About</NavItem>
          <NavItem>Contact</NavItem>
        </ul>

        {/* Right: cart + avatar */}
        <div className="flex items-center gap-6 relative">
          <button
            onClick={() => setOpenCart((s) => !s)}
            className="relative transition-opacity hover:opacity-80"
            aria-label="toggle cart"
          >
            <img src={iconCart} alt="cart" className="w-6 h-6" />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] leading-none px-1.5 py-0.5 rounded-full bg-orange-500 text-white font-bold">
                {totalQty}
              </span>
            )}
          </button>

          <img
            src={imageAvatar}
            alt="avatar"
            className="w-9 h-9 rounded-full border-2 border-transparent hover:border-orange-500 cursor-pointer"
          />

          {/* Cart dropdown */}
          {openCart && (
            <div
              ref={cartRef}
              className="absolute right-0 top-12 w-[360px] bg-white shadow-xl rounded-2xl border overflow-hidden"
            >
              <div className="px-5 py-4 font-semibold">Cart</div>
              <div className="h-px bg-gray-100" />
              <div className="p-5">
                {totalQty === 0 ? (
                  <p className="text-gray-500 text-center py-6">
                    Your cart is empty
                  </p>
                ) : (
                  <>
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 py-3"
                      >
                        <img
                          src={item.thumbnail}
                          alt="product thumbnail"
                          className="w-14 h-14 rounded-md object-cover"
                        />
                        <div className="text-sm text-gray-600 flex-1">
                          <div className="font-medium text-gray-800">
                            {item.title}
                          </div>
                          <div>
                            ${item.price.toFixed(2)} × {item.qty}{" "}
                            <span className="font-semibold text-gray-900">
                              ${(item.price * item.qty).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Delete button */}
                        <button
                          onClick={() => remove(item.id)}
                          className="group p-2 rounded-md hover:bg-red-100 active:scale-90 transition-all duration-150"
                          aria-label="remove item"
                          title="Remove"
                        >
                          <img
                            src={iconDelete}
                            alt="delete"
                            className="w-4 h-4 transition duration-200
                                       group-hover:brightness-0 group-hover:invert group-hover:sepia
                                       group-hover:saturate-[800%] group-hover:hue-rotate-[-45deg]"
                          />
                        </button>
                      </div>
                    ))}
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold text-gray-900">
                        ${totalPrice.toFixed(2)}
                      </span>
                    </div>
                    <button className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl">
                      Checkout
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile sidebar + backdrop */}
      {openMenu && (
        <>
          {/* Backdrop */}
          <button
            aria-label="close menu backdrop"
            className="fixed inset-0 bg-black/40 md:hidden"
            onClick={() => setOpenMenu(false)}
          />
          {/* Sidebar */}
          <aside className="fixed left-0 top-0 h-screen w-64 bg-white shadow-2xl md:hidden z-40 p-5">
            <div className="flex items-center justify-between mb-6">
              <img src={logo} alt="logo" className="h-6" />
              <button
                onClick={() => setOpenMenu(false)}
                aria-label="close menu"
                className="p-1 rounded-md hover:bg-gray-100 active:scale-95 transition"
              >
                <img src={iconClose} alt="close" className="w-6 h-6" />
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {["Collections", "Men", "Women", "About", "Contact"].map(
                (label) => (
                  <li
                    key={label}
                    className="relative py-2 text-gray-800 hover:text-gray-900 cursor-pointer
                               after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5
                               after:h-[3px] after:bg-orange-500 after:scale-x-0 hover:after:scale-x-100
                               after:origin-left after:transition-transform"
                  >
                    {label}
                  </li>
                )
              )}
            </ul>
          </aside>
        </>
      )}
    </header>
  );
};

export default Navbar;
