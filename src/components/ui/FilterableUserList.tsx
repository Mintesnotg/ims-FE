
'use client'

import { use, useState } from "react";

export default function FilterableUserList({ intialuserlist }: { intialuserlist: { id: number, name: string,email:string }[] }) {




    const [filter, setfilter] = useState('')
    const filteredlist = intialuserlist.filter(user => (

        user.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    ))

    return (
        <div>

            <input className="border p-2"
                value={filter} placeholder="search user .. " onChange={e => setfilter(e.target.value)} type="text" />

            <ul>

                {filteredlist.map(user => (
                    <li key={user.id}>{user.email}</li>
                ))}
            </ul>
        </div>

    )


}