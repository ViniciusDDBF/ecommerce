import { supabase } from '../../SupabaseConfig';

export const homeLoader = async () => {
  let { data: carousel_view, error } = await supabase
    .from('carousel_view')
    .select('*')
    .eq('carousel_name', 'elements_kit')
    .single();
  if (error) {
    throw new Response('Product not found', { status: 404 });
  }
  return carousel_view;
};
