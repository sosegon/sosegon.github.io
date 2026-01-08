<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Underline from './Underline.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/Underline',
    component: Underline,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ thickness: 'thick' }} />
