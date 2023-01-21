<script lang="ts">
    import { redirect } from '@sveltejs/kit';
 
    import CreateDish from "$lib/components/Dish/CreateDish.svelte";
    import DishItem from "$lib/components/Dish/DishItem.svelte";

    import { modalStore } from '@skeletonlabs/skeleton';
    import { supabase } from "$lib/supabaseClient";

    import { dishStore, type Dish } from "$lib/data/dishStore";
    dishStore.setup();

    let newMenu: Dish[] = [];
    let newMealDate: string = "";
    let availableMains: any[] = [];
    let availableSides: any[] = [];
    let availableSnacks: any[] = [];
    let displayError: string = "";
    let done = false;

    $: availableMains = $dishStore.filter((dish)=>{        
        return dish.type.id == 1;
    })
    $: availableSides = $dishStore.filter((dish)=>{
        return dish.type.id == 2;
    })
    $: availableSnacks = $dishStore.filter((dish)=>{
        return dish.type.id == 3;
    })

    let addDish = (dish: Dish) => {
        newMenu = [...newMenu, dish];
    }

    let createMeal = async () => {    
        const { data, error } = await supabase
        .from('meal')
        .insert({ meal_date: newMealDate })
        .select();

        if (error) displayError = error.message;
        
        if (data) {
            newMenu.forEach(dish => {                            
                createMenuItem(data[0].id, dish.id)
            });

            done = true;
        }        
    }

    let createMenuItem = async (meal: number, dish: number) => {
        const { data, error } = await supabase
            .from('menu')
            .insert({ meal: meal, dish: dish })
            .select();
        
        if (error) displayError = error.message;
    }

</script>  

{#if displayError}
    <aside class="alert">        
        <div><i class="fa fa-alert"></i></div>    
        <div class="alert-message">
            <h3>Error Creating Meal</h3>
            <p>{displayError}</p>
        </div>        
    </aside>
{/if}

<div class="container mb-12">
    <h1>New Menu</h1>
    <ul class="space-y-4">
        {#each newMenu as item}
        <li>
            <button on:click={() => {
                newMenu.splice(newMenu.findIndex(i => i.id === item.id), 1)                
                newMenu = newMenu;
            }}
             class="btn btn-filled-secondary"><i class="fa fa-minus"></i></button>
            {item.title}
        </li>
        {/each}
    </ul>    
</div>

<!-- <form action="post"> -->
    <label for="meal_date">
        <span>Meal Date</span>
        <input bind:value={newMealDate} type="date" id="meal_date" name="meal_date" />        
    </label>   
    <button on:click={createMeal} class="btn btn-filled-surface">Save</button>
    {#if done}
    <a href="/menu" class="btn btn-filled-success">Done</a>
    {/if}
<!-- </form> -->

<div class="container mt-12">
    <h2>
        Available Dishes
        <button on:click={()=>{
            modalStore.trigger(
                {
                    type: 'component',
                    component: {
                        ref: CreateDish
                    }
                }
            );
        }} class="btn btn-filled-success"><i class="fa-solid fa-plus"></i> Create Dish</button>
    </h2>
    <div class="card">
        <h3>Entree</h3>
        {#each availableMains as dish}
        <DishItem {dish} {addDish} />
        {/each}
    </div>
    <div class="card">
        <h3>Side</h3>
        {#each availableSides as dish}
        <DishItem {dish} {addDish} />
        {/each}
    </div>
    <div class="card">
        <h3>Snack</h3>
        {#each availableSnacks as dish}
        <DishItem {dish} {addDish} />
        {/each}
    </div>
</div>