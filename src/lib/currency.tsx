"use client";

import { createContext, useContext, useState, ReactNode } from "react";
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
  const [currency, setCurrency] = useState<Currency>("PKR");

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies: CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
