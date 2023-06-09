"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Auth0Provider } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "react-query";
import { store } from "../store";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

// ** best practice if this keys is in .env file
const domain = "dev-nyjv1r2gcnpjczq3.us.auth0.com";
const clientId = "QZCBdzzwbElyvz4qCyXgbXmv1bCT1TKu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
      >
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <body className={inter.className}>{children}</body>
          </QueryClientProvider>
        </Provider>
      </Auth0Provider>
    </html>
  );
}
