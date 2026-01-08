<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Navigation from './Navigation.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/Navigation',
    component: Navigation,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ route: 'projects' }} />
