import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import '../styles/globals.css';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-t from-[#767676] via-gray-300 to-[#EAEAEA]'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
