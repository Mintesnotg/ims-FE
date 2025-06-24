// app/page.tsx
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-blue-600">IMS</h1>

        <nav className="space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-blue-500 font-medium">
            Login
          </Link>
          <Link href="/register" className="text-gray-700 hover:text-blue-500 font-medium">
            Register
          </Link>
        </nav>
      </header>

      {/* Banner / Hero */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-4 bg-blue-50">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-4">
          Welcome to the Inventory Management System
        </h2>
        <p className="text-lg text-blue-700 max-w-xl">
          Track, manage, and optimize your inventory in real-time. Simple and efficient solutions for growing businesses.
        </p>
      </section>
    </main>
  );
}
