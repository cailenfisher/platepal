<script lang="ts">
    import type { PageData } from './$types';    

    export let data: PageData;

    let formatDate = (datestring: string) => {
        return new Date(datestring).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
</script>

<div class="container items-center">
    <div class="card space-y-8">
        <h1>Upcoming Meals</h1>
        {#each data.meals as meal}
        <div>
            <a class="" href="/menu/{meal.id}">{formatDate(meal.meal_date)}</a>
        </div>
        {/each}
    </div>
</div>