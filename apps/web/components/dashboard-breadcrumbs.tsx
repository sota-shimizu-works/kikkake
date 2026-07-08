"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type DashboardBreadcrumbsContextValue = {
  items: BreadcrumbItem[];
  setItems: (items: BreadcrumbItem[]) => void;
};

const DashboardBreadcrumbsContext =
  createContext<DashboardBreadcrumbsContextValue | null>(null);

export function DashboardBreadcrumbsProvider({
  children,
  defaultItems = [{ label: "Dashboard" }],
}: {
  children: ReactNode;
  defaultItems?: BreadcrumbItem[];
}) {
  const [items, setItems] = useState<BreadcrumbItem[]>(defaultItems);
  const value = useMemo(() => ({ items, setItems }), [items]);

  return (
    <DashboardBreadcrumbsContext.Provider value={value}>
      {children}
    </DashboardBreadcrumbsContext.Provider>
  );
}

export function useDashboardBreadcrumbs() {
  const context = useContext(DashboardBreadcrumbsContext);
  if (!context) {
    throw new Error(
      "useDashboardBreadcrumbs must be used within DashboardBreadcrumbsProvider",
    );
  }
  return context;
}

export function DashboardBreadcrumbs({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  const { setItems } = useDashboardBreadcrumbs();

  useEffect(() => {
    setItems(items);
  }, [items, setItems]);

  return null;
}
