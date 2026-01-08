<script lang="ts">
  import type { ResumeItem, Size } from '@types';
  import Divider from '../Divider.svelte';
  import InfoStripCard from '../InfoStripCard.svelte';

  export let resumeItem: ResumeItem;
  export let size: Size = 'large';
  export let { role, organization, location, description, dates } = resumeItem;
  export let isOdd: boolean = true;
</script>

<div class={[`resume-card--${size}`, `bevel--${size}`].join(' ')}>
  <InfoStripCard {isOdd} {size} title={role} subtitle=""></InfoStripCard>
  <div class="resume-details">
    <div class="resume-metadata">
      <div class="resume-organization">
        {organization}
      </div>
      <div class="resume-location">
        {location}
      </div>
    </div>
    <div>
      <Divider></Divider>
      <div class="resume-description">
        <span>
          {description}
        </span>
      </div>
      <Divider></Divider>
    </div>
    <div class="resume-dates">{dates}</div>
  </div>
</div>

<style>
  .resume-details {
    display: flex;
    flex-direction: column;
    background-color: var(--color-neutral);
  }
  .resume-metadata {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .resume-organization,
  .resume-location,
  .resume-dates {
    font-family: 'MiSansLatin', sans-serif;
    font-weight: 300;
    color: var(--color-primary);
    opacity: 0.7;
  }
  .resume-dates {
    text-align: end;
  }
  .resume-description {
    font-family: 'MiSansLatin', sans-serif;
    font-weight: 400;
    line-height: 28px;
    color: var(--color-text);
  }
  .resume-card--small {
    .resume-details {
      padding: 16px;
      gap: 8px;
    }
    .resume-organization,
    .resume-location,
    .resume-dates {
      font-size: 12px;
    }
  }
  .resume-card--medium {
    .resume-details {
      padding: 24px;
      gap: 16px;
    }
    .resume-organization,
    .resume-location,
    .resume-dates {
      font-size: 16px;
    }
  }
  .resume-card--large {
    .resume-details {
      padding: 24px 32px;
      gap: 16px;
    }
    .resume-organization,
    .resume-location,
    .resume-dates {
      font-size: 16px;
    }
  }
</style>
