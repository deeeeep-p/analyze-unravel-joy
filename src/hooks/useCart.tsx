import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Service } from "@/data/mockData";

type CartContextValue = {
  items: Service[];
  ids: Set<string>;
  count: number;
  totalPrice: number;
  totalDuration: number;
  add: (s: Service) => void;
  remove: (id: string) => void;
  toggle: (s: Service) => void;
  has: (id: string) => boolean;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "hipster.cart.v1";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Service[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Service[]) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = useCallback((s: Service) => {
    setItems((prev) => (prev.find((p) => p.id === s.id) ? prev : [...prev, s]));
  }, []);

  const remove = useCallback((id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const toggle = useCallback((s: Service) => {
    setItems((prev) =>
      prev.find((p) => p.id === s.id)
        ? prev.filter((p) => p.id !== s.id)
        : [...prev, s],
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(() => {
    const ids = new Set(items.map((i) => i.id));
    return {
      items,
      ids,
      count: items.length,
      totalPrice: items.reduce((sum, i) => sum + i.price, 0),
      totalDuration: items.reduce((sum, i) => sum + i.durationMin, 0),
      add,
      remove,
      toggle,
      has: (id: string) => ids.has(id),
      clear,
    };
  }, [items, add, remove, toggle, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
