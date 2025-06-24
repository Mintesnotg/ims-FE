import FilterableUserList from "components/ui/FilterableUserList"

export default async function MyNextJsPage() {
    interface User {
        id: number;
        name: string;
        email: string;
        // Add other user properties as needed
    }
   
    try {
       // console.log('server component')
        debugger;
        const res = await fetch('http://jsonplaceholder.typicode.com/users', {
             cache: 'no-store',
        })
        if (!res.ok) {
            throw new Error('Failed to fetch users');
        }
        debugger;
    const users: User[] = await res.json();

        return (
            <div className=" text-2xl font-bold ">
                <h1>All Users</h1>
                <FilterableUserList intialuserlist={users} />

            </div>
        )
    } catch (error) {
        console.error('Server fetch failed:', error)
        return <p>Failed to load users .</p>
    }

}