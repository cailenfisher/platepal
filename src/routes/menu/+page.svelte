<script lang="ts">
    import type { PageData } from './$types';

    import DisplayMenu from '$lib/components/Meal/DisplayMenu.svelte';

    export let data: PageData;
    console.log('UI pagedata', data)

    let today = new Date();
    let displayToday = today.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    let dbToday = today.toLocaleString("default", { year: "numeric" }) 
      + '-' + today.toLocaleString("default", { month: "2-digit" }) 
      + '-' + today.toLocaleString("default", { day: "2-digit" });
    let menuItems = data.menuItems;

    let todaysMenu

    $: todaysMenu = data.menuItems.filter((item) => {
      console.log('checking for a meal today', dbToday, todaysMenu, data.menuItems)
      return item.meal.meal_date == dbToday
    })
  </script>
  
  <!-- <h1>{data.id}</h1>
  <div>{@html data.content}</div> -->

  <div class="container mx-auto p-8 space-y-8">
    <div class="text-xl text-primary-500">
        {displayToday}
    </div>
    <div class="card">
      {#if todaysMenu.length > 0}
      <h3>Today's Menu:</h3>
      <DisplayMenu menu={todaysMenu} />
      {:else}
      <div class="error text-error-500">
        <h1>No Meal Planned for today!</h1>
        <h2>We're all going to STARVE!!</h2>
        <h3>SOMEONE CALL THE AUTHORITIES!!!</h3>
      </div>
      <a href="/menu/create" class="btn btn-filled-error">Click to save lives!</a>
      {/if}
    </div>
  </div>
