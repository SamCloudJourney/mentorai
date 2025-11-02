import Link from 'next/link';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <ul>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/learn">Learn</Link></li>
            <li><Link href="/review">Review</Link></li>
            <li><Link href="/settings">Settings</Link></li>
          </ul>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
