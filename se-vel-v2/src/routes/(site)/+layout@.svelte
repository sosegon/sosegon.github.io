<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { fly } from 'svelte/transition';
  import { writable } from 'svelte/store';
  import '@root/app.css';
  import type { Size } from '@types';
  import Header from '@components/Header.svelte';
  import { BREAKPOINTS, ROUTES as routes } from '@constants';
  import HorizontalStrip from '@components/HorizontalStrip.svelte';
  import Navigation from '@components/Navigation/Navigation.svelte';
  import Socials from '@components/Socials.svelte';
  import { socialLinks } from '@data';

  // Renders with the right style after loading is done
  export const windowWidth = writable(typeof window !== 'undefined' ? window.innerWidth : 0);
  let loading = $state(true);
  onMount(() => {
    loading = false;
  });

  let size: Size = $state('small');
  let socialsStyle = $state({
    position: '',
    bottom: '',
    margin: '',
    left: '',
    right: '',
  });

  windowWidth.subscribe((v) => {
    if (v < BREAKPOINTS[0]) {
      size = 'small';
    } else if (v >= BREAKPOINTS[0] && v < BREAKPOINTS[1]) {
      size = 'medium';
      socialsStyle = { position: 'fixed', bottom: '24px', margin: '0 auto', left: '0', right: '0' };
    } else if (v >= BREAKPOINTS[1]) {
      size = 'large';
      socialsStyle = {
        position: 'fixed',
        bottom: '24px',
        left: 'max(calc(16.67vw - 61.33px), calc(50vw - 561.33px))',
        right: '',
      };
    }
  });

  const route = $derived({ label: '', pathname: page.url.pathname });

  const footerStyle = {
    display: 'flex',
    'flex-direction': 'row',
    'justify-content': 'center',
    'align-items': 'center',
    padding: '0 32px',
    height: '60px',
  };

  function checkScroll() {
    const scrollPosition = window.scrollY + window.innerHeight;
    const pageHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= pageHeight) {
      socialsStyle = { ...socialsStyle, opacity: 1 };
    } else {
      delete socialsStyle.opacity;
    }
  }
</script>

<svelte:window bind:innerWidth={$windowWidth} on:scroll={checkScroll} />

{#if loading === true}
  <div></div>
{:else}
  <div id="wrapper">
    <div id="header" in:fly={{ delay: 200, duration: 300, y: -200 }}>
      <Header {size} {routes} {route}></Header>
    </div>
    <slot></slot>
    {#if size === 'small'}
      <div id="footer">
        <HorizontalStrip style={footerStyle} size="small" position="bottom">
          <Navigation {size} {routes} {route} />
        </HorizontalStrip>
      </div>
    {:else}
      <Socials style={socialsStyle} links={socialLinks} isElevated></Socials>
    {/if}
  </div>
{/if}

<style>
  #header {
    width: 100%;
    position: fixed;
    z-index: 1;
  }
  #wrapper {
    display: flex;
    flex-direction: column;
  }
  #footer {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
