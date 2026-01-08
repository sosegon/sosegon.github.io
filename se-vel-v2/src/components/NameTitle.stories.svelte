<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import NameTitle from './NameTitle.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/NameTitle',
    component: NameTitle,
    tags: ['autodocs'],
    argTypes: {},
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ name: 'My Name', size: 'large' }} />
