<script lang="ts">
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    export let meal: Number;

    let reviewCount: Number | undefined = 0;
    let reviewAverage: Number = 0.0;
    let reviews: Array<object> | null

    let loadReviews = async () => {
        const { data, error } = await supabase
        .from('review_meal')
        .select()
        .eq('meal', meal);

        if (data) {
            reviews = data;
            reviewCount = data?.length;
            reviewAverage = data.reduce((total, next) => total + next.rating, 0) / data.length;
            console.log('results review', data)
        }
        
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

{#if reviews}
<div class="pt-10 space-y-2">
    {#each reviews as review}
    <div class="card text-warning-500">
        <!-- <div class="text-xl">{review.created_at}</div> -->
        <div class="text-primary-50">{review.rating} Stars</div>
        <div class="">{review.comment}</div>
    </div>
    {/each}
</div>
{/if}

