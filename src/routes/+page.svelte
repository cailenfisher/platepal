<script lang="ts">
	import { page } from '$app/stores'

	import { AppRail, AppRailTile } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';

	import Auth from '$lib/components/User/Auth.svelte';
	import Account from '$lib/components/User/Account.svelte';


	import { writable, type Writable } from 'svelte/store';

	const selectedMenu: Writable<number> = writable(1);

</script>

<AppRail selected={selectedMenu}>
	<svelte:fragment slot="lead">
		<div class="p-2 text-center">
			<LightSwitch />
		</div>
	</svelte:fragment>

	<!-- (AppRailTiles Here) -->
	<AppRailTile label="Tile" title="Tile" value={1}>(icon)</AppRailTile>

	<svelte:fragment slot="trail">(trail)</svelte:fragment>
</AppRail>
  
  {#if !$page.data.session}
  <Auth />
  {:else}
  <Account session="{$page.data.session}" />
  {/if}
  
