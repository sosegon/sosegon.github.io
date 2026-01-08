<script lang="ts">
  import type { Size } from '@types';

  export let size: Size = 'large';
  export let url: string;
</script>

<img class={size} src={url} alt="portrait" />

<style>
  img {
    border: solid 2px var(--color-primary);
    object-fit: cover;
    aspect-ratio: 1/1;
  }
  .small {
    width: 96px;
    border-radius: 48px;
  }
  .medium {
    width: 128px;
    border-radius: 64px;
  }
  .large {
    width: 192px;
    border-radius: 96px;
  }
</style>
