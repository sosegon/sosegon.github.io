<script lang="ts">
  import type { Size } from '@types';
  import Underline from './Underline.svelte';

  export let size: Size = 'large';
  export let name: string;
</script>

<div class={size}>
  <span>{name}</span>
  <Underline thickness={size === 'small' ? 'thin' : 'thick'} />
</div>

<style>
  div {
    text-align: end;
    color: var(--color-primary);
  }
  span {
    font-family: 'League Gothic';
    text-transform: uppercase;
  }
  .large {
    font-size: 128px;
  }
  .medium {
    font-size: 96px;
  }
  .small {
    font-size: 48px;
    text-align: center;
  }
</style>
