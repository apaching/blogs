"use client";

import { Provider } from "react-redux";
import { store } from "../../store/store";
import { NavBar } from "@/components/nav-bar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <NavBar />
      <main>{children}</main>
    </Provider>
  );
}
