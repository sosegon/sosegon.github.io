<script module>
  import '@root/app.css';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import ProjectDetailsCard from './ProjectDetailsCard.svelte';

  // More on how to set up stories at: https://storybook.js.org/docs/writing-stories
  const { Story } = defineMeta({
    title: 'Example/ProjectDetailsCard',
    component: ProjectDetailsCard,
    tags: ['autodocs'],
  });
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<Story
  name="Primary"
  args={{
    size: 'large',
    data: {
      name: 'Project',
      type: 'Web',
      imgUrl: 'https://google.com',
      technologies: ['tech-1', 'tech-2', 'tech-3'],
      links: {
        github: 'http://google.com',
        web: 'http://google.com',
      },
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod  tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim  veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea  commodo consequat. Duis aute irure dolor in reprehenderit in voluptate  velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint  occaecat cupidatat non proident, sunt in culpa qui officia deserunt  mollit anim id est laborum.',
    },
  }}
/>
