import React from 'react'
import { logoutAction } from 'services/logoutservice';

const Logout = () => {
  return (
    <form action={logoutAction} className='mt-5'>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-md  bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-offset-2"
      >
        {/* Heroicons outline `arrow-left-on-rectangle` or any icon set you use */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 8.25l-3.75 3.75M8.25 12l3.75 3.75M21 12H8.25"
          />
        </svg>
        Log out
      </button>
    </form>
  );
}

export default Logout
