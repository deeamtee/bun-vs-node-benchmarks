/* eslint-disable @next/next/no-head-element */

export default function RootLayout({ children }) {
  return (
    <html>
      <head></head>
      <body id="root">{children}</body>
    </html>
  );
}
