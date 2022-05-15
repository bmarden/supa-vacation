import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@auth0/nextjs-auth0';
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Toaster />
    </UserProvider>
  );
}

export default MyApp;
