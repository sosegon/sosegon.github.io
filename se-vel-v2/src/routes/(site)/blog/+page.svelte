<script lang="ts">
  import { writable } from 'svelte/store';
  import { fly, fade } from 'svelte/transition';
  import '@root/app.css';
  import { blog } from '@data';
  import ProjectCard from '@components/ProjectCard.svelte';
  import { BREAKPOINTS } from '@constants';
  import type { Size } from '@types';

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

  let oddSequence: Array<boolean> = [true, false];
  const blg = blog.map((prj) => {
    const first = oddSequence[oddSequence.length - 2];
    const second = oddSequence[oddSequence.length - 1];
    let isOdd = false;
    if (first && second) isOdd = false;
    else if (first && !second) isOdd = false;
    else if (!first && second) isOdd = true;
    else if (!first && !second) isOdd = true;
    oddSequence.push(isOdd);
    return { ...prj, isOdd };
  });
</script>

<svelte:window bind:innerWidth={$windowWidth} />

<div id="content-wrapper">
  {#if size === 'large'}
    <div class="large-first-column"><div class="page-title">BLOG</div></div>
  {/if}
  <div
    id="common-cards-wrapper"
    in:fly={{
      easing: (x) => x ** 0.5,
      delay: 200,
      duration: 300,
      ...(size === 'small' ? { y: 200 } : { x: 200 }),
    }}
    out:fade={{ duration: 200 }}
  >
    {#each blg as prj, index}
      <ProjectCard
        {size}
        isOdd={size === 'small' ? index % 2 === 0 : prj.isOdd}
        projectName={prj.title}
        projectType=""
        imgUrl={prj.imgUrl}
        onClick={() => {
          window.open(prj.url, '_blank');
        }}
      ></ProjectCard>
    {/each}
  </div>
</div>
