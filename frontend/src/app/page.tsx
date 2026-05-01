import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Dreamlearn Education Pvt Ltd – Learn Towards Success</h1>
      <p>AI-powered LMS for KG-12 + TNPSC/UPSC basics.</p>
      <div style={{ display: 'flex', gap: 12 }}>
        <Link href='/auth/login'>Login</Link>
        <Link href='/auth/register'>Register</Link>
      </div>
    </main>
  );
}
