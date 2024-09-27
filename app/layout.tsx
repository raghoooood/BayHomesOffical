import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { CurrencyProvider } from "./components/hooks/useCurrency";
const font = Lato({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "Bay Homes",
  description: "Bay Homes real-estate website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} dark:bg-bgDark bg-white`}>
      <ThemeProvider enableSystem={true} attribute="class">
      <CurrencyProvider>
        
          {children}
        </CurrencyProvider>
         
        </ThemeProvider>
      </body>
    </html>
  );
}
