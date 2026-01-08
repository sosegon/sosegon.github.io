<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import Socials from './Socials.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/Socials',
    component: Socials,
    tags: ['autodocs'],
    argTypes: {},
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ isElevated: false }} />
