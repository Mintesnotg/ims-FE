
import Posts from 'components/ui/Posts';
import React from 'react'

const page = async () => {

   debugger;
    const res = await fetch('http://jsonplaceholder.typicode.com/users', {
        cache: 'no-store',
    })
    let posts = await res.json();

    return (
        <div>
            <h1 className='text-center'>Roles</h1>
            <Posts posts={posts} />

        </div>
    )
}

export default page
