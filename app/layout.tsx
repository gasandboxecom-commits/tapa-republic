import type { Metadata } from "next";
import "@fontsource-variable/fraunces";
import "@fontsource-variable/manrope";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.github.io/tapa-republic/"),
  title: "TAPA REPUBLIC — Filipino Silog House",
  description: "A fictional Filipino silog house and simulated ordering experience. Silog na Sulit. Sarap na Paulit-ulit.",
  icons: { icon: "/tapa-republic/favicon.svg" },
  openGraph: {
    title: "TAPA REPUBLIC — Filipino Silog House",
    description: "Silog na Sulit. Sarap na Paulit-ulit.",
    images: ["/tapa-republic/og-card.svg"],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
