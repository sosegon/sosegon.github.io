<script lang="ts">
  import type { Size } from '@types';

  export let url: string;
  export let size: Size = 'large';
  export let label: string;
  export let selected: boolean = false;
</script>

<a class={size} class:selected href={url} transition:fade>
  <div>
    {label}
  </div>
</a>

<style>
  a {
    background-color: var(--color-accent-2);
    padding: 12px 16px;
    color: var(--color-primary);
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    height: fit-content;
    transform: skewX(-12deg);
    line-height: auto;
    font-family: 'MiSansLatin', sans-serif;
    font-weight: 400;
    clip-path: xywh(0 0 100% 100% round 15px 15px);
    transition:
      transform 0.3s ease,
      color 0.3s ease;
    &:hover {
      cursor: pointer;
      transform: skewX(0deg);
      transition:
        transform 0.3s ease,
        color 0.3s ease;
      & > div {
        transform: skewX(0deg);
        transition: transform 0.3s ease;
      }
    }
    & > div {
      text-transform: capitalize;
      transition: transform 0.3s ease;
    }
  }

  .small {
    font-size: 16px;
    padding: 12px 10px;
    width: fit-content;
    height: 36px;
    & > div {
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .large,
  .medium {
    font-size: 24px;
    font-weight: 500;
  }

  .selected {
    cursor: pointer;
    background-color: var(--color-primary);
    color: var(--color-accent-2);
    &:hover {
      background-color: var(--color-primary);
      color: var(--color-accent-2);
      cursor: default;
      transform: skewX(-12deg);
    }
  }
</style>
