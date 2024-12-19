import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './providers';
import '../styles/globals.css';

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-t from-[#c4c5c7] via-[#dcdddf] to-[#ebebeb]'>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

export default RootLayout;
