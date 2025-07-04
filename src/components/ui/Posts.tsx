'use client'
export default function Posts({ posts }: { posts: { id: string, name: string, email: string }[] }) {

    debugger;
    const allposts = posts;
    return (
        <div>
            {allposts.map(p => (

                <li key={p.id}>{p.name}</li>
            ))}
        </div>
    )

}