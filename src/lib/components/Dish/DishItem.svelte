<script>
    export let dish;
    export let addDish;
</script>

<div class="p-2">
    <button class="btn btn-filled-primary" on:click={()=>{ addDish(dish) }}><i class="fa fa-plus"></i></button>
    {dish.title}
</div>