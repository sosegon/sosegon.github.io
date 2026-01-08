<script lang="ts">
  import type { Thickness } from '@types';

  export let thickness: Thickness = 'thick';
</script>

<div class={['underline', `${thickness}`].join(' ')}>
  <div class="primary"></div>
  {#each { length: 3 }}
    <div class="secondary"></div>
  {/each}
</div>

<style>
  .underline {
    display: flex;
    flex-direction: row;
  }
  .thick {
    height: 24px;
    --thickness: 24px;
  }
  .thin {
    height: 8px;
    --thickness: 8px;
  }
  .primary {
    flex: 1 1 auto;
    background-color: var(--color-accent-2);
    clip-path: polygon(0 0, 100% 0, calc(100% - var(--thickness)) 100%, 0 100%);
  }
  .secondary {
    background-color: var(--color-accent-2);
    width: calc(2 * var(--thickness));
    clip-path: polygon(50% 0, 100% 0, 50% 100%, 0 100%);
  }
</style>
