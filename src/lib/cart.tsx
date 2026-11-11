import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from "react";
import { PIZZAS } from "./pizzas";
import { computeBill, unitPrice, type Bill, type CrustId, type SizeId } from "./pricing";

export type CartLine = {
  key: string;
  pizzaId: string;
  size: SizeId;
  crust: CrustId;
  qty: number;
};

type State = { lines: CartLine[]; coupon: string | null };

type Action =
  | { type: "add"; pizzaId: string; size: SizeId; crust: CrustId }
  | { type: "inc" | "dec" | "remove"; key: string }
  | { type: "coupon"; code: string | null }
  | { type: "clear" }
  | { type: "hydrate"; state: State };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "add": {
      const key = `${action.pizzaId}|${action.size}|${action.crust}`;
      const existing = state.lines.find((l) => l.key === key);
      return {
        ...state,
        lines: existing
          ? state.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
          : [...state.lines, { key, pizzaId: action.pizzaId, size: action.size, crust: action.crust, qty: 1 }],
      };
    }
    case "inc":
      return { ...state, lines: state.lines.map((l) => (l.key === action.key ? { ...l, qty: l.qty + 1 } : l)) };
    case "dec":
      return {
        ...state,
        lines: state.lines
          .map((l) => (l.key === action.key ? { ...l, qty: l.qty - 1 } : l))
          .filter((l) => l.qty > 0),
      };
    case "remove":
      return { ...state, lines: state.lines.filter((l) => l.key !== action.key) };
    case "coupon":
      return { ...state, coupon: action.code };
    case "clear":
      return { lines: [], coupon: null };
    case "hydrate":
      return action.state;
  }
}

export function lineUnitPrice(line: CartLine) {
  const pizza = PIZZAS.find((p) => p.id === line.pizzaId);
  return pizza ? unitPrice(pizza.prices, line.size, line.crust) : 0;
}

type CartCtx = {
  lines: CartLine[];
  coupon: string | null;
  count: number;
  bill: Bill;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (pizzaId: string, size: SizeId, crust: CrustId) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  remove: (key: string) => void;
  setCoupon: (code: string | null) => void;
  clear: () => void;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "slice-crust-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [], coupon: null });
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", state: JSON.parse(raw) });
    } catch {
      /* ignore broken storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const value = useMemo<CartCtx>(() => {
    const subtotal = state.lines.reduce((s, l) => s + lineUnitPrice(l) * l.qty, 0);
    return {
      lines: state.lines,
      coupon: state.coupon,
      count: state.lines.reduce((s, l) => s + l.qty, 0),
      bill: computeBill(subtotal, state.coupon !== null),
      open,
      setOpen,
      add: (pizzaId, size, crust) => dispatch({ type: "add", pizzaId, size, crust }),
      inc: (key) => dispatch({ type: "inc", key }),
      dec: (key) => dispatch({ type: "dec", key }),
      remove: (key) => dispatch({ type: "remove", key }),
      setCoupon: (code) => dispatch({ type: "coupon", code }),
      clear: () => dispatch({ type: "clear" }),
    };
  }, [state, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
