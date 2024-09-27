import Navbar2 from "@/app/components/Navbar2/Navbar2";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { AppProps } from "next/app";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider enableSystem={true} attribute="class">
        
        <Navbar2 />
       
        <Component {...pageProps} />
        
      </ThemeProvider>
    </>
  );
};

export default App;
