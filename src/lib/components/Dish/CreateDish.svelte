<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
    import type { Dish } from "$lib/data/dishStore";
    import { modalStore } from '@skeletonlabs/skeleton';

    let displayError: string = "";

    let newDish: Dish = {
        title: '',
        type: 0,
    }

    let createDish = async () => {
        const { error } = await supabase
        .from('dish')
        .insert(newDish);

        if (error) {
            displayError = error.message;
        } else {
            modalStore.close();
        }        
    }
</script>

{#if displayError}
    <aside class="alert">        
        <div><i class="fa fa-alert"></i></div>    
        <div class="alert-message">
            <h3>Error Creating Dish</h3>
            <p>{displayError}</p>
        </div>        
    </aside>
{/if}

<div class="container">
    <label for="title">
        <span>Dish Name</span>
        <input type="text" id="title" bind:value={newDish.title} />
    </label>
    <label for="type">
        <span>Dish Type</span>
        <select bind:value={newDish.type} id="type">
            <option value="1">Main</option>
            <option value="2">Side</option>
            <option value="3">Snack</option>
            <option value="4">Fair Game</option>
        </select>
    </label>
    <button on:click={createDish} class="btn btn-filled-primary">Create</button>
</div>
            