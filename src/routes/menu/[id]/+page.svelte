<script lang="ts">
    import type { PageData } from './$types';
    import Review from '$lib/components/Review/Review.svelte';
    import Results from '$lib/components/Review/Results.svelte';
  
    export let data: PageData | null | undefined;
    console.log('UI pagedata by ID', data)

    import { page } from '$app/stores';
    

    let menuDate = new Date(data.meal.meal.meal_date + " EST") //#jenky af
    let displayDate = menuDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
</script>
  
{#if data.meal}
<div class="container mx-auto p-8 space-y-8">
    <div class="text-xl text-primary-500">
        {displayDate}
    </div>
    <a href="/menu/{$page.params.id}/edit" class="btn btn-filled-primary">
        <i class="fa fa-pencil p-1"></i>
        Edit
    </a>
    <div>
        {#each data.menu_items as item}
        <div class="text-xl">
            {item.dish.title}
            <div class="text-md text-warning-500">
                {item.dish.type.title}
            </div>
        </div>
        {/each}        
    </div>
    <div class="bg bg-surface-700">
        <Results meal={data.meal.meal.id} />
    </div>
    <div class="text">
      <Review meal={data.meal.meal.id} />
    </div>
</div>

{:else}
    Meal not Found!!! Starvation!!!
{/if}