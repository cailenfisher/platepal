<script lang="ts">
    import type { PageData } from './$types';
    import Review from '$lib/components/Review/Review.svelte';
  
    export let data: PageData;
    console.log('UI pagedata by ID', data)

    let menuDate = new Date(data.meal.meal.meal_date + " EST") //#jenk
    let displayDate = menuDate.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
</script>
  
{#if data.meal}
<div class="container mx-auto p-8 space-y-8">
    <div class="text-xl text-primary-500">
        {displayDate}
    </div>
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
    <div class="text">
      <Review meal={data.meal.id} />
    </div>
</div>

{:else}
    Meal not Found!!!
{/if}