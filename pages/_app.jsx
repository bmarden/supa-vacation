import '../styles/globals.css';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@auth0/nextjs-auth0';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
      <Toaster />
    </UserProvider>
  );
}

export default MyApp;
