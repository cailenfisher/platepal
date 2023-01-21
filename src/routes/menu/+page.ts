import { error } from '@sveltejs/kit';
// import type { PageLoad } from './$types';
import type { Load } from "@sveltejs/kit";

import { supabase } from '$lib/supabaseClient';
 
export const load: Load = (async () => {
  
const { data, error } = await supabase
.from('menu')
        .select(`
            meal (
                meal_date,
                id
            ),
            dish (
                title,
                type (
                    title
                )
            )
        `)

if (data) 
{
    return { menuItems: data };
}

 
//   throw error(404, 'Not found');
}) //satisfies PageLoad;