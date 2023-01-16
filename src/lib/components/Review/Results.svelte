<script lang="ts">
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    export let meal: Number;

    let reviewCount: Number | undefined = 0;
    let reviewAverage: Number = 0.0;

    let loadReviews = async () => {
        const { data, error } = await supabase
        .from('review_meal')
        .select()
        .eq('meal', meal);

        reviewCount = data?.length;
        reviewAverage = data.reduce((total, next) => total + next.rating, 0) / data.length;
        console.log('results review', data)
    }

    onMount(async () => {
		loadReviews()
        
        
        supabase
        .channel('public:review_meal')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'review_meal' }, payload => {
            console.log('Change received!', payload)
            loadReviews();
        })
        .subscribe()


	});

    
</script>

<h1>Reviews: {reviewCount}</h1>
<h2>Average Rating: {reviewAverage}</h2>

