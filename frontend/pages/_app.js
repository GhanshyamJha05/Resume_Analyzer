import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { GoogleOAuthProvider } from '@react-oauth/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  // Use env var or placeholder for client ID
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "YOUR_GOOGLE_CLIENT_ID";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </GoogleOAuthProvider>
  );
}