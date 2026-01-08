<script lang="ts">
  import type { MouseEventHandler } from 'svelte/elements';
  import type { Project, Size } from '@types';
  import Divider from './Divider.svelte';
  import GithubIcon from './icons/GithubIcon.svelte';
  import WebIcon from './icons/WebIcon.svelte';
  import FigmaIcon from './icons/FigmaIcon.svelte';
  import StorybookIcon from './icons/StorybookIcon.svelte';
  import InfoStripCard from './InfoStripCard.svelte';

  export let size: Size = 'large';
  export let data: Project = {
    name: '',
    type: '',
    technologies: [''],
    imgUrl: '',
    description: '',
    links: { github: '', web: '', figma: '', storybook: '' },
  };
  export let onClickClose: MouseEventHandler<HTMLButtonElement> = () => {};
  export let isOdd: boolean = false;
</script>

<div class={[`project-details-card--${size}`, `bevel--${size}`].join(' ')}>
  <InfoStripCard {isOdd} {size} title={data.name} subtitle="" centerTitle></InfoStripCard>
  <div class="project-details">
    <div class="project-metadata">
      <div class="project-technologies">
        {#each data.technologies as tech}
          <span>{tech}</span>
        {/each}
      </div>
      <div class="project-links">
        {#each Object.keys(data.links || {}) as link}
          {#if link === 'github'}
            <a href={data?.links?.github} target="_blank">
              <GithubIcon size={size === 'small' ? 16 : 24}></GithubIcon>
            </a>
          {/if}
          {#if link === 'web'}
            <a href={data?.links?.web} target="_blank">
              <WebIcon size={size === 'small' ? 16 : 24}></WebIcon>
            </a>
          {/if}
          {#if link === 'figma'}
            <a href={data?.links?.figma} target="_blank">
              <FigmaIcon size={size === 'small' ? 16 : 24}></FigmaIcon>
            </a>
          {/if}
          {#if link === 'storybook'}
            <a href={data?.links?.storybook} target="_blank">
              <StorybookIcon size={size === 'small' ? 16 : 24}></StorybookIcon>
            </a>
          {/if}
        {/each}
      </div>
    </div>
    <div>
      <Divider></Divider>
      <div class="project-description">
        <span>
          {data.description}
        </span>
      </div>
      <Divider></Divider>
    </div>
    <div class="project-close">
      <button on:click={onClickClose}>Close</button>
    </div>
  </div>
</div>

<style>
  .project-details {
    display: flex;
    flex-direction: column;
    background-color: var(--color-neutral);
  }
  .project-metadata {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: 'MiSansLatin', sans-serif;
    font-weight: 300;
    color: var(--color-primary);
  }
  .project-technologies,
  .project-links {
    display: flex;
    flex-direction: row;
    gap: 16px;
    text-transform: capitalize;
  }
  .project-technologies {
    opacity: 0.7;
    text-transform: none;
  }
  @media (min-width: 768px) {
    .project-technologies,
    .project-links {
      gap: 32px;
    }
  }
  .project-links {
    a {
      opacity: 0.7;
      transition: opacity ease 0.3s;
      &:hover {
        opacity: 1;
        transform: opacity ease 0.3s;
      }
    }
  }
  .project-description {
    font-family: 'MiSansLatin', sans-serif;
    font-weight: 400;
    line-height: 28px;
  }
  .project-close {
    text-align: end;
    font-family: 'MiSansLatin', sans-serif;
    font-weight: 300;
    button {
      text-decoration: underline;
      color: var(--color-text);
      opacity: 0.7;
      cursor: pointer;
      transform: opacity ease 2.3s;
      &:hover {
        opacity: 1;
        transform: opacity ease 2.3s;
      }
    }
  }
  .project-details-card--small {
    .project-details {
      padding: 16px;
      gap: 8px;
    }
    .project-metadata,
    .project-description,
    .project-close {
      font-size: 16px;
    }
  }
  .project-details-card--medium {
    .project-details {
      padding: 24px;
      gap: 16px;
    }
    .project-metadata,
    .project-description,
    .project-close {
      font-size: 16px;
    }
  }
  .project-details-card--large {
    .project-details {
      padding: 24px 32px;
      gap: 16px;
    }
    .project-metadata,
    .project-description,
    .project-close {
      font-size: 16px;
    }
  }
</style>
