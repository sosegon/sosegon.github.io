<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { writable } from 'svelte/store';
  import { fade, fly } from 'svelte/transition';
  import type { Size } from '../types';
  import { BREAKPOINTS, NAME, ROUTES } from '@constants';
  import NameTitle from '@components/NameTitle.svelte';

  // Renders with the right style after loading is done
  export const windowWidth = writable(typeof window !== 'undefined' ? window.innerWidth : 0);
  let loading = true;
  onMount(() => {
    loading = false;
  });

  export let size: Size = 'small';
  windowWidth.subscribe((v) => {
    if (v < BREAKPOINTS[0]) {
      size = 'small';
    } else if (v >= BREAKPOINTS[0] && v < BREAKPOINTS[1]) {
      size = 'medium';
    } else if (v >= BREAKPOINTS[1]) {
      size = 'large';
    }
  });

  let linePositions: Array<any> = []; // Will hold the `x` positions for each <li>
  let listItems: Array<any> = []; // Bound to the dom li element
  const calculateLinePositions = async () => {
    await tick();
    setTimeout(() => {
      linePositions = listItems.map((item) => {
        const { x, y, height } = item.getBoundingClientRect();
        return { x, y, h: height };
      });
    }, 50);
  };

  onMount(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', calculateLinePositions);
      return () => {
        window.removeEventListener('resize', calculateLinePositions);
      };
    }
  });
</script>

<svelte:window bind:innerWidth={$windowWidth} />

{#if loading === true}
  <div></div>
{:else}
  <div id="wrapper">
    <div id="title" in:fly={{ duration: 300, x: -100 }} out:fade={{ duration: 200 }}>
      <NameTitle name={NAME[size]} {size} />
    </div>
    <div id="menu">
      <ul
        on:introend={calculateLinePositions}
        in:fly={{ duration: 300, x: -100 }}
        out:fade={{ duration: 200 }}
      >
        {#each ROUTES.slice(1) as route, index}
          <li bind:this={listItems[index]} id={`menu-${index}`} style="--index: {index}">
            <a href={route.pathname}>
              {route.label}
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div id="profile" in:fly={{ duration: 300, x: 100 }} out:fade={{ duration: 200 }}>
      <span>Creative Technologist</span>
    </div>
    <div id="background" in:fade></div>
    {#if size !== 'small'}
      <div id="lines-container">
        {#each linePositions as pos, index}
          <div
            class="horizontal-line"
            style="top: {pos.y + pos.h / 2}px; width: calc({pos.x}px - 32px);"
            in:fly={{ delay: index * 100, duration: 300, x: -1000 }}
            out:fade={{ duration: 200 }}
          ></div>
          <div
            class="diagonal-line"
            style="top: {pos.y + pos.h / 2}px; left: calc({pos.x}px - 32px); height: 200vh"
            in:fly={{ delay: index * 100, duration: 300, y: 1000 }}
            out:fade={{ duration: 200 }}
          ></div>
        {/each}
      </div>
    {/if}
  </div>
{/if}

<style>
  #wrapper {
    display: grid;
    padding: 0 16px 16px 0;
    height: 100vh;
    grid-template-rows: 1fr 4fr 1fr;
  }
  #menu {
    margin: auto;
  }
  ul {
    display: flex;
    flex-direction: column;
    gap: 40px;
    li {
      align-self: center;
      text-transform: capitalize;
      color: var(--color-primary);
      font-size: 40px;
      font-family: 'MiSansLatin', sans-serif;
      font-weight: 600;
      transition: transform ease 0.3s;
      &:hover {
        transform: translateX(5px);
        transition: transform ease 0.3s;
      }
      a {
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
  #profile {
    font-family: 'IBM Plex Serif';
    font-weight: 300;
    font-size: 40px;
    letter-spacing: 0px;
    display: flex;
    align-items: end;
    justify-content: end;
    span {
      max-width: 400px;
      text-align: end;
      padding: 16px;
      margin-right: -16px;
      background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, var(--color-neutral) 100%);
    }
  }
  #background {
    z-index: -1;
    position: absolute;
    opacity: 0.25;
    height: 100vh;
    width: 100vw;
    transform: scaleX(-1);
    background-size: 300%;
    background-position: -140px 0;
    background-repeat: no-repeat;
    background-image: linear-gradient(30deg, rgba(255, 255, 255, 0) 0%, var(--color-neutral) 100%),
      url('/images/main.jpg');
  }

  @media (min-width: 768px) {
    #wrapper {
      padding: 0 32px 32px 0;
    }
    ul {
      gap: 32px;
      justify-content: center;
      li {
        font-size: 48px;
        font-weight: 500;
        margin-left: calc(var(--index) * 64px);
      }
    }
    #lines-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow-y: hidden;
      pointer-events: none; /* Ensures the lines don't block user interactions */
    }
    .horizontal-line {
      position: absolute;
      left: 0;
      height: 1px;
      background-color: var(--color-primary);
    }
    .diagonal-line {
      position: absolute;
      left: 0;
      width: 0.5px;
      background-color: var(--color-primary);
      transform: rotate(45deg);
      transform-origin: top right;
    }
    #profile {
      font-size: 48px;
      span {
        max-width: 100vh;
        width: 100%;
        margin-right: -32px;
        padding: 16px;
      }
    }
    #background {
      background-size: 170%;
    }
  }

  @media (min-width: 1440px) {
    #wrapper {
      grid-template-columns: repeat(3, 1fr);
    }
    #title {
      grid-column: 1/3;
    }
    #menu {
      grid-column: 2/3;
      grid-row: 2/5;
    }
    #profile {
      grid-column: 1/-1;
      grid-row: 6;
    }
    #background {
      background-size: 120%;
    }
  }
</style>
