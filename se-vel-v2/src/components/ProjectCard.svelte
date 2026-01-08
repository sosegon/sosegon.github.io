<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import './projectCard.css';
  import type { Size } from '../types';
  import InfoStripCard from './InfoStripCard.svelte';

  export let size: Size = 'large';
  export let isOdd: boolean = true;
  export let projectName: string;
  export let projectType: string;
  export let imgUrl: string;
  export let onClick: MouseEventHandler<HTMLDivElement> = () => {};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  on:click={onClick}
  on:keypress={() => {}}
  class={['project-card', `project-card--${size}`, `bevel--${size}`].join(' ')}
>
  <img src={imgUrl} alt={`${projectName}-${projectType}`} />
  <div class="curtain"></div>
  <InfoStripCard title={projectName} subtitle={projectType} {isOdd} {size} />
</div>

<style>
</style>
