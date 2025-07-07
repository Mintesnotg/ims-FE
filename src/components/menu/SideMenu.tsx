/*
 * SideMenu.tsx — collapsible‑width sidebar (hamburger toggles narrow ↔ wide)
 * -------------------------------------------------------------------------
 * – Collapses to a 4‑rem (w‑16) icon‑bar on the left.
 * – Expands to full 16‑rem (w‑64) panel stretching right when open.
 * – Smooth width transition; always anchored to the left edge.
 * – Mobile (< md) still hides off‑canvas for full‑screen content space.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu as MenuIcon } from "lucide-react";
import { MenuItem } from "types/response/menuresponse/menuitem";

interface SideMenuProps {
  items: MenuItem[];
}

export default function SideMenu({ items }: SideMenuProps) {
  const [open, setOpen] = useState(true);
  // Track which root menu is open (accordion)
  const [activeRoot, setActiveRoot] = useState<number | null>(null);

  const toggle = () => setOpen((o) => !o);

  return (
    <>
      {/* Hamburger – sticks to sidebar edge */}
      <button
        aria-label="Toggle menu"
        onClick={toggle}
        className="absolute left-2 top-3 z-20 rounded-md border p-2 shadow md:static md:ml-2 md:mt-3 md:hidden bg-white/80 hover:bg-blue-100 transition"
      >
        <MenuIcon className="h-5 w-5 text-blue-700" />
      </button>

      {/* Overlay (mobile only) */}
      <div
        onClick={toggle}
        className={`fixed inset-0 z-10 bg-white transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <nav
        className={`fixed inset-y-0 z-10 flex flex-col bg-gradient-to-br from-blue-100 to-blue-200 shadow-xl transition-all duration-200 ${
          open ? "w-64" : "w-16 md:w-16"
        } ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } border-r border-blue-200/60`}
      >
        {/* Desktop hamburger inside sidebar (hidden on md+) */}
        <button
          aria-label="Toggle menu"
          onClick={toggle}
          className="mb-4 hidden self-end rounded-md border bg-white p-2 shadow md:block hover:bg-blue-100 transition"
        >
          <MenuIcon className="h-5 w-5 text-blue-700" />
        </button>

        <ul className="flex-1 space-y-1 px-2 pt-5">
          {items.map((it, idx) => (
            <MenuNode
              key={it.id}
              item={it}
              depth={0}
              expanded={open}
              isRoot={true}
              isActive={activeRoot === idx}
              onRootClick={() => setActiveRoot(activeRoot === idx ? null : idx)}
            />
          ))}
        </ul>
      </nav>
    </>
  );
}

/* ------------------------------------------------------------------
   Recursive node                                                    */
function MenuNode({
  item,
  depth,
  expanded,
  isRoot = false,
  isActive = false,
  onRootClick,
}: {
  item: MenuItem;
  depth: number;
  expanded: boolean;
  isRoot?: boolean;
  isActive?: boolean;
  onRootClick?: () => void;
}) {
  // Accordion: only one submenu open at each level
  const [activeChild, setActiveChild] = useState<number | null>(null);
  const hasChildren = item.children.length > 0;

  // Accordion click handler
  const handleClick = () => {
    if (isRoot && onRootClick) {
      onRootClick();
    } else if (hasChildren) {
      setActiveChild(activeChild === 0 ? null : 0); // Only one child open at a time
    }
  };

  return (
    <li>
      <div
        onClick={hasChildren ? handleClick : undefined}
        className={`flex items-center gap-2 rounded-lg px-2 py-2 cursor-pointer select-none transition-all
          ${expanded ? "hover:bg-blue-100" : "hover:bg-blue-50"}
          ${isRoot && isActive ? "bg-blue-200/70" : ""}
          ${!expanded ? "justify-center" : ""}
        `}
        style={{ paddingLeft: depth * 12 }}
      >
        {hasChildren && (
          <span className="w-4 text-center text-blue-500">
            {isRoot ? (isActive ? "▾" : "▸") : activeChild === 0 ? "▾" : "▸"}
          </span>
        )}
        {item.icon && <i className={`${item.icon} w-4 text-sm text-blue-500`} />}
        {/* Show label only when sidebar is expanded */}
        {expanded && (
          item.url ? (
            <Link href={`${item.url}`} className="flex-1 font-medium text-blue-900 hover:text-blue-700 transition-colors">
              {item.name}
            </Link>
          ) : (
            <span className="flex-1 text-base font-extrabold text-indigo-600">
              {item.name}
            </span>
          )
        )}
      </div>

      {/* Accordion submenu: only show if active */}
      {hasChildren && ((isRoot ? isActive : activeChild === 0)) && (
        <ul className="space-y-1 mt-1 ml-2 border-l border-blue-200 pl-2 transition-all duration-200">
          {item.children.map((c, idx) => (
            <MenuNode
              key={c.id}
              item={c}
              depth={depth + 1}
              expanded={expanded}
              isRoot={false}
              isActive={activeChild === idx}
              onRootClick={() => setActiveChild(activeChild === idx ? null : idx)}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
