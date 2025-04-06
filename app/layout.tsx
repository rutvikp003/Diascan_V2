"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ChatbotBox from "@/components/Chatbot/chatbot";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";
import { Providers } from "./providers"; // Import the updated Providers
import { Provider } from "react-redux";
import store from "@/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Provider store={store}>
          <Providers>
            <Header />
            <div className="relative">
              <div className="absolute bottom-0 right-16 size-16">
                <ChatbotBox/>
              </div>
            </div>
            {children}
            <Footer />
            <ScrollToTop />
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
