import React from "react";
import { Menu as MenuIcon } from "lucide-react";

export default function HamburgerButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      aria-label="Toggle menu"
      onClick={onClick}
      className="rounded-full bg-white p-2 shadow hover:bg-blue-100 transition"
    >
      <MenuIcon className="h-6 w-6 text-blue-700" />
    </button>
  );
} 