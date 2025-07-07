import React from "react";
import { Menu as MenuIcon } from "lucide-react";

export default function SidebarHeader({ onHamburgerClick }: { onHamburgerClick: () => void }) {
  return (
    <div className="flex items-center justify-end py-6 px-4 bg-gradient-to-br from-blue-50 to-blue-200">
      <button
        aria-label="Toggle menu"
        onClick={onHamburgerClick}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow hover:bg-blue-100 transition"
      >
        <MenuIcon className="h-6 w-6 text-blue-700" />
      </button>
    </div>
  );
} 