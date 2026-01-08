<script lang="ts">
  import type { Size, Route } from '@types';
  import HorizontalStrip from './HorizontalStrip.svelte';
  import Navigation from './Navigation/Navigation.svelte';
  import Socials from './Socials.svelte';
  import { socialLinks } from '@data';

  export let size: Size = 'large';
  export let routes: Array<Route> = [
    { label: 'link1', pathname: '' },
    { label: 'link2', pathname: 'link2' },
    { label: 'link3', pathname: 'link3' },
  ];
  export let route: Route = routes[0];

  const style = {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'space-between',
    'align-items': 'center',
    padding: '0 32px',
    height: '80px',
  };
</script>

<HorizontalStrip {style} {size} position="top">
  <a href="/" style="user-select: none;"><span class={size}>SE-VEL</span></a>
  {#if size !== 'small'}
    <Navigation {size} {routes} {route} />
  {:else}
    <Socials links={socialLinks} />
  {/if}
</HorizontalStrip>

<style>
  span {
    font-family: 'League Gothic';
    color: var(--color-primary);
    font-size: 48px;
  }
</style>
