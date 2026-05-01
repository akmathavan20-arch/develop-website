export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html><body style={{ margin: 0, fontFamily: 'Inter, sans-serif', background: '#0b1020', color: 'white' }}>{children}</body></html>;
}
