import { error } from '@sveltejs/kit';
// import type { PageLoad } from './$types';
import type { Load } from "@sveltejs/kit";

import { supabase } from '$lib/supabaseClient';
 
export const load: Load = (async () => {
  
const { data, error } = await supabase
.from('meal')
.select()

if (data) 
{
    return { meals: data };
}

 
//   throw error(404, 'Not found');
}) //satisfies PageLoad;