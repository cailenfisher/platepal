<script lang="ts">
    import { supabase } from '$lib/supabaseClient';

    import { onMount } from 'svelte';

    let meal;

    onMount(async ()=>{
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
    console.log(data)
        
}
    })
</script>