import type { Load } from "@sveltejs/kit";

import { supabase } from '$lib/supabaseClient';
 
export const load: Load = (async () => {
  
const { data, error } = await supabase
.from('meal')
        .select(`
            meal_date,
            id
        `)

if (data) 
{
    return { meals: data };
}

}) //satisfies PageLoad;