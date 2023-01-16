import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
// import type { Load } from "@sveltejs/kit";

import { supabase } from '$lib/supabaseClient';
 
export const load: PageLoad = async ( { params } ) => {
  
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
.eq('meal', params.id)

if (data) 
{
    console.log(data)
    return { 
        meal: data[0],
        menu_items: data
    } //# this is jenky af
}

 
//   throw error(404, 'Not found');
} //satisfies PageLoad;