<script lang="ts">
  import './socials.css';
  import GithubIcon from './icons/GithubIcon.svelte';
  import UpworkIcon from './icons/UpworkIcon.svelte';
  import LinkedInIcon from './icons/LinkedInIcon.svelte';

  export let links: { github: string; upwork: string; linkedin: string };
  export let isElevated: boolean = false;
  export let style: Record<string, string> = {};
  export let openInNewTab: boolean = true;
</script>

<div
  class={['socials'].join(' ')}
  class:elevated={isElevated}
  style={Object.entries(style)
    .map(([key, value]) => `${key}: ${value};`)
    .join(' ')}
>
  <a href={links?.upwork} target={openInNewTab ? '_blank' : '_self'}>
    <UpworkIcon />
  </a>
  <a href={links?.github} target={openInNewTab ? '_blank' : '_self'}>
    <GithubIcon />
  </a>
  <a href={links?.linkedin} target={openInNewTab ? '_blank' : '_self'}>
    <LinkedInIcon />
  </a>
</div>
