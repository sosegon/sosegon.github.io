<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import InfoStripCard from './InfoStripCard.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/InfoStripCard',
    component: InfoStripCard,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ size: 'large', title: 'Title', subtitle: 'Subtitle' }} />
