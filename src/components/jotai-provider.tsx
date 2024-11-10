"use client";

import { Provider } from "jotai";

interface JotaiProvider {
  children: React.ReactNode;
}

export const JotaiProvider = ({ children }: JotaiProvider) => {
  return <Provider>{children}</Provider>;
};
