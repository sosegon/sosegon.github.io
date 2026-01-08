<script lang="ts">
  import type { Size, Route } from '@types';
  import NavItem from './NavItem.svelte';

  export let size: Size = 'large';
  export let routes: Array<Route> = [
    { label: 'link1', pathname: '/' },
    { label: 'link2', pathname: '/link2' },
    { label: 'link3', pathname: '/link3' },
  ];
  export let route: Route = routes[0];
</script>

<div class={size}>
  {#each routes as r}
    <NavItem {size} label={r.label} selected={r.pathname === route.pathname} url={r.pathname} />
  {/each}
</div>

<style>
  div {
    display: flex;
    flex-direction: row;
  }
  .small {
    gap: 4px;
  }
  .medium,
  .large {
    gap: 12px;
  }
</style>
