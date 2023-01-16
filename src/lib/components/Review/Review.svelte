<script lang="ts">
    import { supabase } from "$lib/supabaseClient";
    export let meal: Number;

    let review = {
        meal: meal,
        rating: 0,
        comment: ""
    }

    let saveReview = async () => {
        const { error } = await supabase
        .from('review_meal')
        .insert(review);

        if (error) {
            console.error(error)
        }
        saved = true;
    }

    let saved = false;
</script>

{#if saved}
<h1 class="text-primary-900">Thank you for your review!</h1>
{:else}
<form>
    <label for="rating">
        <span>Stars</span>
        <select name="rating" id="rating" bind:value={review.rating}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
    </label>
    <label for="comment">
        <span>Comment</span>
        <textarea name="comment" id="comment" bind:value={review.comment}></textarea>                    
    </label>
    <button on:click={saveReview}>Save</button>
</form>
{/if}