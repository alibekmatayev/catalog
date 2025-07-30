import { Montserrat } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.scss";
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"] });

export const metadata = {
  title: "Каталог",
  description: "Интерактивный магазин с фильтрами, корзиной и SSR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${montserrat.className}`}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
