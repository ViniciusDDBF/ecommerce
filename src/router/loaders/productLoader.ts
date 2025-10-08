import type { LoaderFunctionArgs } from 'react-router';
import { supabase } from '../../SupabaseConfig';

export const productLoader = async ({ params }: LoaderFunctionArgs) => {
  const slug = params.slug;
  if (!slug) throw new Response('Not Found', { status: 404 });
  const { data, error } = await supabase
    .from('product_page_details')
    .select('*')
    .eq('product_slug', slug)
    .single();
  if (error || !data) {
    throw new Response('Product not found', { status: 404 });
  }
  return data;
};
