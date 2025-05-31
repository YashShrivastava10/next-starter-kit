import { Footer } from "@/components/common/Footer/Footer";
import { Header } from "@/components/common/Header/Header";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <main className="h-[calc(100vh-80px-101px)] flex-grow sm:h-[calc(100vh-80px-65px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
