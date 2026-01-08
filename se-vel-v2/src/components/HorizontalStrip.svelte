<script lang="ts">
  import type { Size, Position } from '@types';

  export let size: Size = 'large'; // 'small', 'medium', or 'large'
  export let position: Position = 'top'; // 'top' or 'bottom'
  export let style: Record<string, string> = {};
</script>

<div
  class={[size, position].join(' ')}
  style={Object.entries(style)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')}
>
  <slot></slot>
</div>

<style>
  div {
    background-color: white;
  }
  .small {
    height: 60px;
  }
  .medium {
    height: 100px;
  }
  .large {
    height: 100px;
  }
  .top {
    box-shadow: 0px 2px 4px rgb(0, 0, 0, 0.25);
  }
  .bottom {
    box-shadow: 0px -2px 4px rgb(0, 0, 0, 0.25);
  }
</style>
