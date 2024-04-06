import RainbowKitAndChakraProvider from "./RainbowKitAndChakraProvider";
import { Inter } from "next/font/google";

import { RdaProvider } from "@/utils";

import Layout from "@/components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Real Diploma App",
  description: "Turn your diploma into a certified NFT ",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RainbowKitAndChakraProvider>
          <RdaProvider>
            <Layout>
              {children}
            </Layout>
          </RdaProvider>
        </RainbowKitAndChakraProvider>    
      </body>
    </html>
  );
}