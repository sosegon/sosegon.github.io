<script lang="ts">
  import type { Size } from '@types';

  export let text: string;
  export let size: Size = 'large';
</script>

<div class={[`${size}`, `bevel--${size}`].join(' ')}>
  {text}
</div>

<style>
  div {
    background-color: var(--color-neutral);
    color: var(--color-text);
    font-family: 'MiSansLatin', sans-serif;
    font-weight: 400;
  }
  .large {
    padding: 64px 32px;
    font-size: 24px;
  }
  .medium {
    padding: 48px 32px;
    font-size: 24px;
  }
  .small {
    padding: 24px 16px;
    font-size: 16px;
  }
</style>
