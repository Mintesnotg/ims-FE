import Posts from "components/ui/Posts";

// app/dashboard/settings/page.tsx
export default async function DashboardSettings() {


  const res = await fetch('http://jsonplaceholder.typicode.com/users', {
    cache: 'no-store',
  })
  let posts = await res.json();

  return (
    
      <Posts posts={posts} />
    
  );
}