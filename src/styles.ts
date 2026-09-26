import { css } from 'lit';

export const cardStyles = css`
  :host {
    display: block;
    --bar-radius: var(
      --bar-card-border-radius,
      var(--ha-progress-bar-border-radius, var(--ha-card-border-radius, 12px))
    );
  }
  ha-card {
    display: block;
    background: var(--ha-card-background, var(--card-background-color, var(--ha-color-surface-default, #fff)));
    border-radius: var(--ha-card-border-radius, 12px);
    box-shadow: var(--ha-card-box-shadow, var(--ha-box-shadow-s, 0 2px 8px #0002));
    overflow: hidden;
  }
  ha-card.square {
    border-radius: 0;
  }
  ha-card.entity-row {
    background: transparent;
    box-shadow: none;
    border: 0;
  }
  .card-title {
    padding: 18px 18px 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: var(--primary-text-color);
  }
  .bars {
    display: grid;
    grid-template-columns: repeat(var(--columns), minmax(0, 1fr));
    gap: 12px 16px;
    padding: 16px;
  }
  .entity-row .bars {
    padding: 0;
  }
  .bar-error {
    grid-column: 1 / -1;
    padding: 10px 12px;
    border-radius: 10px;
    background: var(--warning-color, #a65f00);
    color: white;
  }
  bar-card-card {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    color: var(--primary-text-color);
    cursor: pointer;
    border-radius: var(--bar-radius);
    outline: 0;
  }
  bar-card-card:focus-visible {
    box-shadow: 0 0 0 3px var(--primary-color);
  }
  bar-card-card.vertical {
    flex-direction: column;
    min-height: var(--bar-height);
  }
  .outside {
    display: flex;
    align-items: center;
    gap: 7px;
    min-width: 0;
  }
  .outside:empty {
    display: none;
  }
  .leading ha-icon {
    --mdc-icon-size: 22px;
    color: var(--bar-color);
  }
  .name {
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: 500;
  }
  .value {
    white-space: nowrap;
    font-weight: 650;
    font-variant-numeric: tabular-nums;
  }
  .indicator {
    font-size: 0.8rem;
    color: var(--bar-color);
  }
  .minmax {
    font-size: 0.72rem;
    opacity: 0.8;
    white-space: nowrap;
  }
  bar-card-background {
    display: block;
    position: relative;
    flex: 1;
    min-width: 0;
    width: var(--bar-width);
    height: var(--bar-height);
    border-radius: var(--bar-radius);
    isolation: isolate;
  }
  .vertical bar-card-background {
    width: min(var(--bar-width), 100%);
    min-height: var(--bar-height);
  }
  bar-card-backgroundbar,
  bar-card-currentbar,
  bar-card-change {
    display: block;
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  bar-card-backgroundbar {
    background: var(--ha-progress-bar-track-color, color-mix(in srgb, var(--bar-color) 16%, transparent));
  }
  bar-card-currentbar {
    background: var(--bar-color);
    width: var(--bar-progress);
  }
  .motion-change bar-card-currentbar {
    transition:
      width var(--change-duration) ease,
      height var(--change-duration) ease;
  }
  bar-card-change {
    pointer-events: none;
    z-index: 2;
    background: linear-gradient(
      100deg,
      transparent 15%,
      color-mix(in srgb, var(--bar-color) 25%, white) 50%,
      transparent 85%
    );
    opacity: 0;
    animation: bar-change var(--change-duration) ease-out 1;
  }
  @keyframes bar-change {
    20% {
      opacity: 0.55;
    }
    100% {
      opacity: 0;
    }
  }
  .horizontal.reverse bar-card-currentbar {
    left: auto;
    right: 0;
  }
  .vertical bar-card-currentbar {
    top: auto;
    bottom: 0;
    width: 100%;
    height: var(--bar-progress);
  }
  .vertical.reverse bar-card-currentbar {
    top: 0;
    bottom: auto;
  }
  bar-card-currentbar.animated {
    animation: bar-pulse var(--animation-speed) ease-in-out infinite;
  }
  @keyframes bar-pulse {
    50% {
      opacity: 0.65;
    }
  }
  bar-card-markerbar {
    display: block;
    position: absolute;
    z-index: 2;
    left: var(--bar-target);
    top: 0;
    bottom: 0;
    width: 2px;
    background: var(--primary-text-color);
    opacity: 0.8;
  }
  .horizontal.reverse bar-card-markerbar {
    left: auto;
    right: var(--bar-target);
  }
  .vertical bar-card-markerbar {
    left: 0;
    right: 0;
    top: auto;
    bottom: var(--bar-target);
    width: auto;
    height: 2px;
  }
  .vertical.reverse bar-card-markerbar {
    top: var(--bar-target);
    bottom: auto;
  }
  bar-card-contentbar {
    position: absolute;
    z-index: 3;
    inset: 0;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 10px;
    min-width: 0;
  }
  bar-card-contentbar .value {
    margin-left: auto;
  }
  bar-card-contentbar ha-icon {
    --mdc-icon-size: 20px;
    flex: none;
  }
  .vertical bar-card-contentbar {
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 4px;
    text-align: center;
  }
  .vertical bar-card-contentbar .value {
    margin: 0;
    padding: 3px 6px;
    border-radius: 6px;
    color: var(--primary-text-color);
    background: var(--card-background-color, var(--ha-color-surface-default, #fff));
    box-shadow: var(--ha-box-shadow-s, 0 1px 4px #0002);
  }
  .vertical .outside {
    justify-content: center;
  }
  @media (max-width: 520px) {
    .bars {
      grid-template-columns: 1fr;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    bar-card-currentbar {
      transition: none;
      animation: none !important;
    }
    bar-card-change {
      animation: none !important;
      display: none;
    }
  }
`;
