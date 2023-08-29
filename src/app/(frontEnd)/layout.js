import NavBar from "@/components/NavBar";
import ClientFooter from "@/components/footer/ClientFooter";
import ContextWrapper from "../context/ContextWrapper";


export default function ClientLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ContextWrapper>
          <NavBar />
          {children}
          <ClientFooter />
        </ContextWrapper>
      </body>
    </html>
  );
}
