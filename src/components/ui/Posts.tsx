'use client'

import { use } from "react"


export default function Posts({ posts }: { posts: { id: string, name: string ,email :string }[]}) {


    const allposts =  posts;
    return (
        <div>
            {allposts.map(p => (

                <li key={p.id}>{p.name}</li>
            ))}
        </div>
    )

}