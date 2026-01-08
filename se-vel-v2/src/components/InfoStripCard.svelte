<script lang="ts">
  import type { Size } from '@types';

  export let title: string;
  export let subtitle: string;
  export let isOdd: boolean = true;
  export let size: Size = 'large';
  export let centerTitle: boolean = false;
</script>

<div
  class={['strip', `${size}`].join(' ')}
  class:strip--odd={isOdd}
  class:strip--even={!isOdd}
  class:strip--center-title={centerTitle}
>
  <div class="strip-title">
    {title}
  </div>
  {#if subtitle}
    <div class="strip-subtitle">{subtitle}</div>
  {/if}
</div>

<style>
  .strip {
    display: flex;
    flex-direction: row;
    font-family: 'MiSansLatin', sans-serif;
  }
  .strip--center-title {
    text-align: center;
    .strip-title {
      padding-left: 0 !important;
    }
  }
  .strip--odd {
    color: var(--color-primary);
    background-color: var(--color-accent-2);
  }

  .strip--even {
    color: var(--color-accent-2);
    background-color: var(--color-primary);
  }

  .large {
    height: 80px;
    .strip-title {
      font-size: 26px;
      padding: 0 0 0 32px;
    }
    .strip-subtitle {
      font-size: 16px;
      padding: 0 16px 8px 0;
    }
  }

  .medium {
    height: 80px;
    .strip-title {
      font-size: 26px;
      padding: 0 0 0 24px;
    }
    .strip-subtitle {
      font-size: 16px;
      padding: 0 8px 8px 0;
    }
  }

  .small {
    height: 60px;
    .strip-title {
      font-size: 18px;
      padding: 0 0 0 16px;
    }
    .strip-subtitle {
      font-size: 12px;
      padding: 0 8px 8px 0;
    }
  }

  .strip-title {
    font-weight: 500;
    flex: 1 1 auto;
    align-self: center;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }

  .strip-subtitle {
    font-weight: 300;
    align-self: flex-end;
    overflow: hidden;
    text-wrap: nowrap;
    text-overflow: ellipsis;
  }
</style>
