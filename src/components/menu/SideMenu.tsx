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
import { Menu as MenuIcon, X as CloseIcon } from "lucide-react";
import { MenuItem } from "types/response/menuresponse/menuitem";


interface SideMenuProps {
  items: MenuItem[];
}

export default function SideMenu({ items }: SideMenuProps) {
  const [open, setOpen] = useState(true);
  
  const toggle = () => setOpen((o) => !o);

  return (
    <>
      {/* Hamburger – sticks to sidebar edge */}
      <button
        aria-label="Toggle menu"
        onClick={toggle}
        className="absolute left-2 top-3 z-20 rounded-md border p-2 shadow md:static md:ml-2 md:mt-3 md:hidden"
      >
        {open ? <MenuIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
      </button>

      {/* Overlay (mobile only) */}
      <div
        onClick={toggle}
        className={`fixed inset-0 z-10 bg-black/40 transition-opacity md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Sidebar */}
      <nav
        className={`fixed left-0 top-0 z-20 flex h-full flex-col overflow-y-auto  bg-gray-100 transition-all duration-200 md:relative md:z-auto ${
          open ? "w-64" : "w-16 md:w-16"
        } ${
          /* On mobile completely hide when closed */
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Desktop hamburger inside sidebar (hidden on md+) */}
        <button
          aria-label="Toggle menu"
          onClick={toggle}
          className="mb-4 hidden self-end rounded-md border bg-white p-2 shadow md:block"
        >
          {open ? <MenuIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>

        <ul className="flex-1 space-y-1 px-2 pt-5">
          {items.map((it) => (
            <MenuNode key={it.id} item={it} depth={0} expanded={open} />
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
}: {
  item: MenuItem;
  depth: number;
  expanded: boolean;
}) {
  const [open, setOpen] = useState(false);
  const hasChildren = item.children.length > 0;

  return (
    <li>
      <div
        onClick={() => hasChildren && setOpen((o) => !o)}
        className="flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200"
        style={{ paddingLeft: depth * 8 }}
      >
        {hasChildren && (
          <span className="w-4 text-center">{open ? "▾" : "▸"}</span>
        )}
        {item.icon && <i className={`${item.icon} w-4 text-sm`} />}
        {/* Show label only when sidebar is expanded */}
        {expanded && (
          item.url ? (
            <Link href={`/${item.url}`} className="flex-1 font-light">
              {item.name}
            </Link>
          ) : (
            <span className="flex-1 text-base font-extrabold text-indigo-500">{item.name}</span>
          )
        )}
      </div>

      {hasChildren && open && (
        <ul className="space-y-1 mt-2">
          {item.children.map((c) => (
            <MenuNode key={c.id} item={c} depth={depth + 1} expanded={expanded} />
          ))}
        </ul>
      )}
    </li>
  );
}
