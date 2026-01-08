<script lang="ts">
  import { writable } from 'svelte/store';
  import { fly, fade } from 'svelte/transition';
  import '@root/app.css';
  import { about } from '@data';
  import { BREAKPOINTS } from '@constants';
  import type { Size } from '@types';
  import TextArea from '@components/TextArea.svelte';
  import Portrait from '@components/Portrait.svelte';

  export const windowWidth = writable(typeof window !== 'undefined' ? window.innerWidth : 0);
  let size: Size = $state('small');
  windowWidth.subscribe((v) => {
    if (v < BREAKPOINTS[0]) {
      size = 'small';
    } else if (v >= BREAKPOINTS[0] && v < BREAKPOINTS[1]) {
      size = 'medium';
    } else if (v >= BREAKPOINTS[1]) {
      size = 'large';
    }
  });
</script>

<svelte:window bind:innerWidth={$windowWidth} />

<div id="content-wrapper">
  {#if size === 'large'}
    <div class="large-first-column"><div class="page-title">ABOUT</div></div>
  {/if}
  <div
    id="about-wrapper"
    in:fly={{
      easing: (x) => x ** 0.5,
      delay: 200,
      duration: 300,
      ...(size === 'small' ? { y: 200 } : { x: 200 }),
    }}
    out:fade={{ duration: 200 }}
  >
    <div class="portrait">
      <Portrait url="/images/portrait.jpg" {size}></Portrait>
    </div>
    <div class="about-area">
      <TextArea {size} text={about}></TextArea>
    </div>
  </div>
</div>

<style>
  #about-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    max-width: calc(100vw - 64px);
    margin: auto;
  }

  @media (min-width: 768px) {
    #about-wrapper {
      gap: 24px;
      width: 600px;
    }
  }

  @media (min-width: 1440px) {
    #about-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 33.33%);
      grid-column: 2/-1;
      gap: 32px;
      width: 915px;
    }
    .portrait {
      grid-column: 3;
      grid-row: 1;
    }
    .about-area {
      grid-column: 1/3;
    }
  }
</style>
