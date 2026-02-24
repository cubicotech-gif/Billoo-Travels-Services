"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Currency, CURRENCIES } from "@/lib/data";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  currencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "PKR",
  setCurrency: () => {},
  currencies: CURRENCIES,
});

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>("PKR");

  // Persist selection across page refreshes
  useEffect(() => {
    const stored = localStorage.getItem("billoo_currency") as Currency | null;
    if (stored && CURRENCIES.includes(stored)) {
      setCurrencyState(stored);
    }
  }, []);

  function setCurrency(c: Currency) {
    setCurrencyState(c);
    localStorage.setItem("billoo_currency", c);
  }

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
