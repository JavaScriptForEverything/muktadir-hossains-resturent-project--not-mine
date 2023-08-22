import NavBar from "@/components/NavBar";
import ClientFooter from "@/components/footer/ClientFooter";

export default function ClientLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <NavBar />
        {children}
        <ClientFooter/>
      </body>
    </html>
  );
}
