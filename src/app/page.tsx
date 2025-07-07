// app/page.tsx
import Link from 'next/link';
import React from "react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white/80 shadow-md backdrop-blur-md">
        <h1 className="text-2xl font-extrabold text-blue-700 tracking-tight">IMS</h1>
        <nav className="space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
            Login
          </Link>
          <Link href="/register" className="text-gray-700 hover:text-blue-600 font-semibold transition-colors">
            Register
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 py-16 md:py-24 max-w-6xl mx-auto w-full">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-4xl md:text-5xl font-extrabold text-blue-800 mb-4 drop-shadow-sm">
            Welcome to the Inventory Management System
          </h2>
          {/* Dynamic Counting Number Placeholder */}

          <p className="text-lg md:text-xl text-blue-700 max-w-xl mb-6">
            Track, manage, and optimize your inventory in real-time. Simple and efficient solutions for growing businesses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Link href="/register" className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3 text-white font-bold shadow hover:from-blue-700 hover:to-indigo-700 transition-all text-lg">
              Get Started
            </Link>
            <Link href="/login" className="rounded-full border border-blue-600 px-8 py-3 text-blue-700 font-bold bg-white/80 shadow hover:bg-blue-50 transition-all text-lg">
              Demo Login
            </Link>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {/* Placeholder for hero image or illustration */}
          <div className="w-64 h-64 md:w-80 md:h-80 bg-blue-100 rounded-3xl flex items-center justify-center shadow-inner">
            <span className="text-6xl md:text-7xl text-blue-300">📦</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto w-full px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="rounded-2xl bg-white/90 p-6 shadow flex flex-col items-center text-center">
          <div className="mb-3 text-3xl text-blue-500">📊</div>
          <h3 className="font-bold text-lg mb-2 text-blue-800">Real-Time Analytics</h3>
          <p className="text-gray-600">Monitor your inventory levels, sales, and trends with up-to-date dashboards.</p>
        </div>
        <div className="rounded-2xl bg-white/90 p-6 shadow flex flex-col items-center text-center">
          <div className="mb-3 text-3xl text-blue-500">🔗</div>
          <h3 className="font-bold text-lg mb-2 text-blue-800">Seamless Integrations</h3>
          <p className="text-gray-600">Connect with suppliers, e-commerce, and accounting platforms easily.</p>
        </div>
        <div className="rounded-2xl bg-white/90 p-6 shadow flex flex-col items-center text-center">
          <div className="mb-3 text-3xl text-blue-500">🔒</div>
          <h3 className="font-bold text-lg mb-2 text-blue-800">Secure & Reliable</h3>
          <p className="text-gray-600">Your data is protected with enterprise-grade security and 24/7 uptime.</p>
        </div>
      </section>

      {/* Dynamic Content Placeholders */}
      <section className="max-w-5xl mx-auto w-full px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Placeholder for dynamic stats */}
          <div className="rounded-2xl bg-white/90 p-6 shadow flex flex-col items-center text-center min-h-[140px]">
            <h4 className="font-bold text-blue-700 mb-2">Inventory Stats</h4>
            <div className="text-gray-500">{/* TODO: Fetch and display stats from API */}Coming soon: live inventory, sales, and more.</div>
          </div>
          {/* Placeholder for recent activity */}
          <div className="rounded-2xl bg-white/90 p-6 shadow flex flex-col items-center text-center min-h-[140px]">
            <h4 className="font-bold text-blue-700 mb-2">Recent Activity</h4>
            <div className="text-gray-500">{/* TODO: Fetch and display recent activity from API */}Coming soon: recent orders, stock changes, and more.</div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-white/80 py-6 mt-auto shadow-inner text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Inventory Management System. All rights reserved.
      </footer>
    </main>
  );
}
