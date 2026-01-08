<script lang="ts">
  import { writable } from 'svelte/store';
  import { fly, fade } from 'svelte/transition';
  import '@root/app.css';
  import { resume } from '@data';
  import ResumeCard from '@components/ResumeCard/ResumeCard.svelte';
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
</script>

<svelte:window bind:innerWidth={$windowWidth} />

<div id="content-wrapper">
  {#if size === 'large'}
    <div class="large-first-column"><div class="page-title">RESUME</div></div>
  {/if}
  <div
    id="resume-cards-wrapper"
    in:fly={{
      easing: (x) => x ** 0.5,
      delay: 200,
      duration: 300,
      ...(size === 'small' ? { y: 200 } : { x: 200 }),
    }}
    out:fade={{ duration: 200 }}
  >
    <div class="cards-title">WORK</div>
    {#each resume.work as resumeItem, index}
      <ResumeCard {size} {resumeItem} isOdd={index % 2 !== 0}></ResumeCard>
    {/each}
    <div class="cards-title">STUDIES</div>
    {#each resume.studies as resumeItem, index}
      <ResumeCard {size} {resumeItem} isOdd={index % 2 === 0}></ResumeCard>
    {/each}
  </div>
</div>

<style>
  #resume-cards-wrapper {
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }
  .cards-title {
    width: 100%;
    text-align: end;
    font-family: 'IBM Plex Serif';
    font-style: italic;
    font-weight: 500;
    font-size: 32px;
  }
  .cards-title:nth-child(n + 2) {
    margin-top: 16px;
  }
  @media (min-width: 768px) {
    #resume-cards-wrapper {
      gap: 24px;
    }
    .cards-title {
      line-height: 24px;
      font-size: 40px;
    }
    .cards-title:nth-child(n + 2) {
      margin-top: 24px;
    }
  }

  @media (min-width: 1440px) {
    #resume-cards-wrapper {
      grid-column: 2/-1;
      gap: 32px;
    }
    .cards-title {
      line-height: 32px;
      font-size: 48px;
    }
    .cards-title:nth-child(n + 2) {
      margin-top: 40px;
    }
  }
</style>
