import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { TemplateResult } from 'lit';
import type { BarCardConfig, HomeAssistant, ResolvedBar } from './types';
import { displayValue, matchingSeverity, numericValue, percent, resolveBars, validateConfig } from './config';
import { cardStyles } from './styles';
import { translate } from './i18n';
import './editor';

const VERSION = '4.0.0';

@customElement('bar-card')
export class BarCard extends LitElement {
  static styles = cardStyles;

  static getConfigElement(): HTMLElement {
    return document.createElement('bar-card-editor');
  }

  static getStubConfig(): BarCardConfig {
    return { entity: 'sun.sun' };
  }

  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: BarCardConfig;
  private previous = new Map<string, number>();
  private holdTimer?: number;
  private tapTimer?: number;
  private held = false;
  private activePointer?: number;

  setConfig(config: BarCardConfig): void {
    validateConfig(config);
    this.previous.clear();
    this.config = structuredClone(config);
  }

  getCardSize(): number {
    const count = this.config?.entities?.length ?? 1;
    const columns =
      this.config?.stack === 'horizontal' ? count : Math.max(1, Number(this.config?.columns ?? 1));
    const rows = Math.ceil(count / columns);
    const height = Number.parseInt(String(this.config?.height ?? '40'), 10);
    return Math.max(
      1,
      Math.ceil((rows * (Number.isFinite(height) ? height + 16 : 56) + (this.config?.title ? 44 : 0)) / 50),
    );
  }

  getGridOptions(): { columns: number; min_columns: number; rows: number; min_rows: number } {
    return { columns: 6, min_columns: 3, rows: Math.max(1, this.getCardSize()), min_rows: 1 };
  }

  protected render(): TemplateResult {
    if (!this.config || !this.hass) return html``;
    const bars = resolveBars(this.config, this.hass.states);
    const columns =
      this.config.stack === 'horizontal' ? bars.length : Math.max(1, Number(this.config.columns ?? 1));
    const row = this.config.entity_row;
    return html`
      <ha-card class=${row ? 'entity-row' : ''}>
        ${this.config.title && !row ? html`<div class="card-title">${this.config.title}</div>` : nothing}
        <div id="states" class="bars" style=${styleMap({ '--columns': String(columns) })}>
          ${bars.map((bar) => this.renderBar(bar))}
        </div>
      </ha-card>
    `;
  }

  private renderBar(bar: ResolvedBar): TemplateResult | typeof nothing {
    const state = this.hass?.states[bar.entity];
    if (!state)
      return html`<div class="bar-error" role="status">
        ${translate(this.hass?.locale?.language ?? this.hass?.language, 'Entity not available')}:
        ${bar.entity}
      </div>`;
    const raw = bar.attribute ? state.attributes[bar.attribute] : state.state;
    const number = numericValue(raw);
    const severity = matchingSeverity(raw, bar.severity);
    if (severity?.hide) return nothing;
    const bounded =
      number === undefined
        ? undefined
        : bar.limit_value
          ? Math.max(bar.min, Math.min(bar.max, number))
          : number;
    const fill = percent(bounded, bar.min, bar.max);
    const target = bar.target === undefined ? undefined : percent(numericValue(bar.target), bar.min, bar.max);
    const color =
      severity?.color ||
      (number === undefined ? 'var(--bar-card-disabled-color, var(--disabled-text-color))' : bar.color);
    const icon = severity?.icon || bar.icon || state.attributes.icon;
    const name = bar.name || state.attributes.friendly_name || bar.entity;
    const unit = bar.unit_of_measurement ?? state.attributes.unit_of_measurement ?? '';
    const value = displayValue(bounded ?? raw, bar, String(unit));
    const previous = this.previous.get(bar.entity);
    const indicator =
      number === undefined || previous === undefined || number === previous
        ? ''
        : number > previous
          ? '▲'
          : '▼';
    if (number !== undefined) this.previous.set(bar.entity, number);
    const vertical = ['up', 'down', 'up-reverse', 'down-reverse'].includes(bar.direction);
    const reverse = ['left', 'down', 'right-reverse', 'up-reverse'].includes(bar.direction);
    const minmax = html`<span class="minmax">${bar.min} / ${bar.max}${unit ? ` ${unit}` : ''}</span>`;
    const iconTemplate = icon ? html`<ha-icon .icon=${String(icon)} aria-hidden="true"></ha-icon>` : nothing;
    const indicatorTemplate = indicator
      ? html`<span
          class="indicator"
          aria-label=${translate(this.hass?.locale?.language ?? this.hass?.language, indicator === '▲' ? 'Increasing' : 'Decreasing')}
          >${indicator}</span
        >`
      : nothing;
    const style = styleMap({
      '--bar-color': color,
      '--bar-progress': `${fill}%`,
      '--bar-target': `${target ?? 0}%`,
      '--bar-height': typeof bar.height === 'number' ? `${bar.height}px` : bar.height || '40px',
      '--bar-width': bar.width || '100%',
      '--animation-speed': `${Math.max(0.2, Number(bar.animation.speed) || 5)}s`,
    });
    return html`
      <bar-card-card
        class=${`${vertical ? 'vertical' : 'horizontal'} ${reverse ? 'reverse' : ''}`}
        style=${style}
        role="button"
        tabindex="0"
        aria-label=${`${name}, ${value}`}
        @click=${(event: MouseEvent) => this.onClick(event, bar)}
        @dblclick=${(event: MouseEvent) => this.onDoubleClick(event, bar)}
        @keydown=${(event: KeyboardEvent) => this.onKeydown(event, bar)}
        @pointerdown=${(event: PointerEvent) => this.onPointerDown(event, bar)}
        @pointerup=${this.onPointerEnd}
        @pointercancel=${this.onPointerEnd}
        @pointerleave=${this.onPointerEnd}
      >
        <div class="outside leading">
          ${bar.positions.icon === 'outside' ? iconTemplate : nothing}
          ${bar.positions.name === 'outside' ? html`<span class="name">${name}</span>` : nothing}
        </div>
        <bar-card-background
          role="progressbar"
          aria-label=${String(name)}
          aria-valuemin=${String(bar.min)}
          aria-valuemax=${String(bar.max)}
          aria-valuenow=${number === undefined ? nothing : String(Math.max(bar.min, Math.min(bar.max, number)))}
          aria-valuetext=${value}
        >
          <bar-card-backgroundbar></bar-card-backgroundbar>
          <bar-card-currentbar class=${bar.animation.state === 'on' ? 'animated' : ''}></bar-card-currentbar>
          ${target === undefined ? nothing : html`<bar-card-markerbar></bar-card-markerbar>`}
          <bar-card-contentbar>
            ${bar.positions.icon === 'inside' ? iconTemplate : nothing}
            ${bar.positions.name === 'inside' ? html`<span class="name">${name}</span>` : nothing}
            ${bar.positions.minmax === 'inside' ? minmax : nothing}
            ${bar.positions.value === 'inside' ? html`<span class="value">${value}</span>` : nothing}
            ${bar.positions.indicator === 'inside' ? indicatorTemplate : nothing}
          </bar-card-contentbar>
        </bar-card-background>
        <div class="outside trailing">
          ${bar.positions.indicator === 'outside' ? indicatorTemplate : nothing}
          ${bar.positions.minmax === 'outside' ? minmax : nothing}
          ${bar.positions.value === 'outside' ? html`<span class="value">${value}</span>` : nothing}
        </div>
      </bar-card-card>
    `;
  }

  private dispatchAction(bar: ResolvedBar, action: 'tap' | 'hold' | 'double_tap'): void {
    this.dispatchEvent(
      new CustomEvent('hass-action', {
        bubbles: true,
        composed: true,
        detail: {
          config: action === 'tap' && !bar.tap_action ? { ...bar, tap_action: { action: 'more-info' } } : bar,
          action,
        },
      }),
    );
  }

  private onClick(event: MouseEvent, bar: ResolvedBar): void {
    if (this.held) {
      this.held = false;
      return;
    }
    if (bar.double_tap_action) {
      window.clearTimeout(this.tapTimer);
      this.tapTimer = window.setTimeout(() => this.dispatchAction(bar, 'tap'), 250);
    } else this.dispatchAction(bar, 'tap');
    event.stopPropagation();
  }

  private onDoubleClick(event: MouseEvent, bar: ResolvedBar): void {
    if (!bar.double_tap_action) return;
    window.clearTimeout(this.tapTimer);
    this.dispatchAction(bar, 'double_tap');
    event.stopPropagation();
  }

  private onKeydown(event: KeyboardEvent, bar: ResolvedBar): void {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    if (!event.repeat) this.dispatchAction(bar, 'tap');
  }

  private onPointerDown(event: PointerEvent, bar: ResolvedBar): void {
    if (!bar.hold_action || event.button !== 0) return;
    this.activePointer = event.pointerId;
    this.held = false;
    this.holdTimer = window.setTimeout(() => {
      this.held = true;
      this.dispatchAction(bar, 'hold');
    }, 500);
  }

  private onPointerEnd = (event: PointerEvent): void => {
    if (this.activePointer !== undefined && event.pointerId !== this.activePointer) return;
    window.clearTimeout(this.holdTimer);
    this.activePointer = undefined;
  };

  disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this.holdTimer);
    window.clearTimeout(this.tapTimer);
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
window.customCards = window.customCards || [];
if (!window.customCards.some((card) => card.type === 'bar-card')) {
  window.customCards.push({
    type: 'bar-card',
    name: 'Bar Card',
    description: 'Modern, configurable bars for entity values',
    preview: true,
    documentationURL: 'https://github.com/Adrian-RDA/bar-card',
  });
}
console.info(`BAR-CARD ${VERSION}`);
