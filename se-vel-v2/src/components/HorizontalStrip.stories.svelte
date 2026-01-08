<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import HorizontalStrip from './HorizontalStrip.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/HorizontalStrip',
    component: HorizontalStrip,
    tags: ['autodocs'],
    argTypes: {
      size: {
        control: { type: 'radio' },
        options: ['small', 'medium', 'large'],
      },
    },
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ size: 'large', position: 'top' }} />
