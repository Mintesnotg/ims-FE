import React from 'react';
import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-100 via-blue-50 to-blue-200 p-4">
      <div className="w-full max-w-md rounded-3xl bg-white/80 backdrop-blur-md p-8 shadow-2xl border border-red-200 flex flex-col items-center">
        {/* Warning Icon */}
        <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-red-100 shadow-inner">
          <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-red-600 mb-2 drop-shadow">Unauthorized</h1>
        <p className="text-gray-700 mb-2 text-center text-base sm:text-lg">You do not have permission to view this page.</p>
        <p className="text-gray-500 text-sm mb-6 text-center">Please contact your administrator if you believe this is a mistake.</p>
        <Link href="/" className="inline-block rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 px-6 py-2 text-white font-semibold shadow hover:from-blue-600 hover:to-indigo-600 transition-all">Go to Home</Link>
      </div>
    </div>
  );
} 