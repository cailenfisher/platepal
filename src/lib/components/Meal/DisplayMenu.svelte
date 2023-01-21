<script>
    export let menu
</script>

{#each menu as item}
<div class="text-xl">
    {item.dish.title}
    <div class="text-md text-warning-500">
        {item.dish.type.title}
    </div>
</div>
{/each} 