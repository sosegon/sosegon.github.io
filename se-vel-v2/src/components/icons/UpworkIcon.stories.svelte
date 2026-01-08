<script module>
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import UpworkIcon from './UpworkIcon.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/UpworkIcon',
    component: UpworkIcon,
    tags: ['autodocs'],
    argTypes: {
      size: {
        control: { type: 'number' },
      },
    },
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story name="Primary" args={{ size: 32, color: '#1c005c' }} />
