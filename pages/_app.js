import { ThemeProvider } from 'next-themes';
import Script from 'next/script';
import '../styles/globals.css';
import { Navbar, Footer } from '../components/Layouts';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark:bg-nft-dark bg-white min-h-screen">
      <Navbar />
      <Component {...pageProps} />
      <Footer />
    </div>

    {/* Font awesomes for icons inside project */}
    <Script src="https://kit.fontawesome.com/31b1a5de47.js" crossorigin="anonymous" />
  </ThemeProvider>
);

export default MyApp;
