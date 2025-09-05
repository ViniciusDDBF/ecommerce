import { useLoaderData } from 'react-router';

export async function productsLoader() {
  // Fetch fake products before rendering
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');

  if (!res.ok)
    throw new Response('Failed to fetch products', { status: res.status });

  const data = await res.json();
  return data;
}

export default function ProductsPage() {
  const products = useLoaderData();

  return (
    <div className="bg-black flex flex-1 h-900">
      <h1>Products</h1>
      <ul>
        {products.slice(0, 10).map((p: any) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
