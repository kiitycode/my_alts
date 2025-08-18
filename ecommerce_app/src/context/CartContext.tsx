import React, { createContext, useContext, useMemo, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number; // unit price
  qty: number;
  thumbnail: string;
};

type CartCtx = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  remove: (id: string) => void;   // NEW
  clear: () => void;
  totalQty: number;
  totalPrice: number;
};

const Ctx = createContext<CartCtx | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (incoming: CartItem) => {
    setItems(prev => {
      const i = prev.findIndex(p => p.id === incoming.id);
      if (i === -1) return [...prev, incoming];
      const next = [...prev];
      next[i] = { ...next[i], qty: next[i].qty + incoming.qty };
      return next;
    });
  };

  const remove = (id: string) => {
    setItems(prev => prev.filter(p => p.id !== id));
  };

  const clear = () => setItems([]);

  const { totalQty, totalPrice } = useMemo(() => {
    const totalQty = items.reduce((n, it) => n + it.qty, 0);
    const totalPrice = items.reduce((n, it) => n + it.qty * it.price, 0);
    return { totalQty, totalPrice };
  }, [items]);

  return (
    <Ctx.Provider value={{ items, addItem, remove, clear, totalQty, totalPrice }}>
      {children}
    </Ctx.Provider>
  );
};

export const useCart = () => {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used inside <CartProvider>");
  return v;
};
