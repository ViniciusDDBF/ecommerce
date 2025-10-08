import { supabase } from '../../SupabaseConfig';

export const homeLoader = async () => {
  try {
    const data1 = await supabase
      .from('carousel_view')
      .select('*')
      .eq('carousel_name', 'elements_kit')
      .single();
    return [data1.data];
  } catch (_err) {
    throw new Response('Product not found', { status: 404 });
  }
};
