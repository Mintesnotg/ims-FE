
"use client";

import Link from 'next/link';
import React, { useState } from 'react'
import { MenuItem } from 'types/response/menuresponse/menuitem';

interface MenuProps {
    items: MenuItem[];
}


function MenuNode({ item, depth }: { item: MenuItem; depth: number }) {
    const [open, setOpen] = useState(false);
    const hasChildren = item.children.length > 0;

    return (
        <li className='mt-1'>
            <div
                onClick={() => hasChildren && setOpen((o) => !o)}
                className="flex cursor-pointer select-none items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-200"
                style={{ paddingLeft: depth * 16 }} // 16 px per level
            >
                {hasChildren && <span>{open ? "▾" : "▸"}</span>}
                {item.icon && <i className={`${item.icon} w-4 text-sm`} />}
                {item.url ? (
                    <Link href={`/${item.url}`} className="flex-1 shadow-2xl ">
                        {item.name}
                    </Link>
                ) : (
                    <span className="flex-1  text-base text-indigo-600">{item.name}</span>
                )}
            </div>

            {hasChildren && open && (
                <ul className="space-y-1">
                    {item.children.map((c) => (
                        <MenuNode key={c.id} item={c} depth={depth + 1} />
                    ))}
                </ul>
            )}
        </li>
    );
}

const SideMenu = ({ items }: MenuProps) => {
    return (
        <nav className="w-64 h-screen overflow-y-auto bg-gray-100 border-r">
            <ul className="p-2 space-y-1 mt-5">
                {items.map((it) => (
                    <MenuNode key={it.id} item={it} depth={0} />
                ))}
            </ul>
        </nav>
    );
}

export default SideMenu
