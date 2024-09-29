import { ReactNode } from "react";
import { Josefin_Sans } from "next/font/google";

import "@/app/_styles/globals.css";
import Header from "./_components/Header";
import Navigation from "./_components/Navigation";


const josefinFont = Josefin_Sans({
  display: "swap",
  subsets: ['latin'],
});

interface Metadata {
  title: { template: String; default?: String };
  description: String;
}

export const metadata: Metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Luxurious cabins hotel, Located in the heart of Italy, Surrounded by fascinating mountains and dark forests",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {

  return (
    <html lang="en" className="h-full">
      <body className={`${josefinFont.className} min-h-screen text-primary-100 bg-primary-950 flex flex-col h-full`}>
        <Header >
          <Navigation />
        </Header>

        <main className="flex-1 border-t border-primary-900">
          <div className="max-w-[100%] md:max-w-7xl mx-auto ">
            {children}
          </div>
        </main>
      </body>
    </html>
  );

}
