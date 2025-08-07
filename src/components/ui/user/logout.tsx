import React from 'react'
import { logoutAction } from 'services/useraccount/logoutservice';

const Logout = ({ open = true }: { open?: boolean }) => {
  return (
    <form action={logoutAction} className="">
      <button
        type="submit"
        className={`inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-sm font-semibold text-white shadow-lg transition-all duration-150 hover:from-indigo-600 hover:to-blue-600 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 ${open ? 'px-5 py-2.5' : 'w-12 h-12 p-0'}`}
        title="Logout"
      >
        {/* Left arrow icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        {open && <span>Log&nbsp;out</span>}
      </button>
    </form>
  );
}

export default Logout
