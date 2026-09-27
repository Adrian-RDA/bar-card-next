import { LitElement, css, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { TemplateResult } from 'lit';
import { DEFAULT_POSITIONS } from './config';
import { translate } from './i18n';
import type { BarCardConfig, BarOptions, HomeAssistant, SeverityRule } from './types';

type Tab = 'entities' | 'appearance' | 'values' | 'rules' | 'actions';
type FieldType = 'text' | 'number' | 'checkbox' | 'select';

@customElement('bar-card-next-editor')
export class BarCardEditor extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;
  @state() private config?: BarCardConfig;
  @state() private selected = -1;
  @state() private tab: Tab = 'entities';
  @state() private error = '';

  private t(text: string): string {
    return translate(this.hass?.locale?.language ?? this.hass?.language, text);
  }

  setConfig(config: BarCardConfig): void {
    this.config = structuredClone(config);
    const count = this.entries().length;
    if (this.selected >= count) this.selected = -1;
  }

  private entries(): Array<string | BarOptions> {
    if (!this.config) return [];
    return this.config.entities ?? (this.config.entity ? [this.config.entity] : []);
  }

  private normalized(): BarCardConfig {
    const config = structuredClone(this.config ?? {});
    if (!config.entities) {
      config.entities = config.entity ? [{ entity: config.entity }] : [];
      delete config.entity;
    }
    config.entities = config.entities.map((entry) => (typeof entry === 'string' ? { entity: entry } : entry));
    return config;
  }

  private scope(): BarOptions {
    if (this.selected === -1) return this.config ?? {};
    const entry = this.entries()[this.selected];
    return typeof entry === 'string' ? { entity: entry } : (entry ?? {});
  }

  private selectedLabel(): string {
    const entity = this.scope().entity ?? '';
    return this.hass?.states[entity]?.attributes.friendly_name || entity || `Bar ${this.selected + 1}`;
  }

  private edit(update: (config: BarCardConfig, scope: BarOptions) => void): void {
    const next = this.normalized();
    const scope = this.selected === -1 ? next : (next.entities![this.selected] as BarOptions);
    update(next, scope);
    this.config = next;
    this.error = '';
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config: next }, bubbles: true, composed: true }),
    );
  }

  private change(key: keyof BarOptions, value: unknown): void {
    this.edit((_config, scope) => {
      if (value === '' || value === undefined) delete (scope as Record<string, unknown>)[key];
      else (scope as Record<string, unknown>)[key] = value;
    });
  }

  private addEntity(): void {
    const first = Object.keys(this.hass?.states ?? {})[0] ?? '';
    const next = this.normalized();
    next.entities!.push({ entity: first });
    this.config = next;
    this.selected = next.entities!.length - 1;
    this.emit(next);
  }

  private moveEntity(index: number, offset: number): void {
    const next = this.normalized();
    const target = index + offset;
    if (target < 0 || target >= next.entities!.length) return;
    [next.entities![index], next.entities![target]] = [next.entities![target], next.entities![index]];
    this.config = next;
    this.selected = target;
    this.emit(next);
  }

  private removeEntity(index: number): void {
    const next = this.normalized();
    next.entities!.splice(index, 1);
    if (!next.entities!.length) return;
    this.config = next;
    this.selected = -1;
    this.emit(next);
  }

  private emit(config: BarCardConfig): void {
    this.dispatchEvent(
      new CustomEvent('config-changed', { detail: { config }, bubbles: true, composed: true }),
    );
  }

  private field(
    label: string,
    key: keyof BarOptions,
    type: FieldType = 'text',
    options: string[] = [],
    hint = '',
  ): TemplateResult {
    const value = this.scope()[key];
    const inherited = this.selected !== -1 && value === undefined;
    const placeholder = inherited ? `${this.t('Inherited')}: ${String(this.config?.[key] ?? 'default')}` : '';
    return html`<label class="field">
      <span>${this.t(label)}</span>
      ${
        type === 'checkbox'
          ? html`<input
              type="checkbox"
              .checked=${Boolean(value ?? this.config?.[key])}
              @change=${(e: Event) => this.change(key, (e.target as HTMLInputElement).checked)}
            />`
          : type === 'select'
            ? html`<select
                .value=${String(value ?? '')}
                @change=${(e: Event) => this.change(key, (e.target as HTMLSelectElement).value)}
              >
                ${inherited ? html`<option value="">${this.t('Inherited')}</option>` : nothing}
                ${options.map((option) => html`<option value=${option}>${this.t(option)}</option>`)}
              </select>`
            : html`<input
                type=${type}
                .value=${value === undefined ? '' : String(value)}
                placeholder=${placeholder}
                @change=${(e: Event) => {
                  const raw = (e.target as HTMLInputElement).value;
                  this.change(key, type === 'number' && raw !== '' ? Number(raw) : raw);
                }}
              />`
      }
      ${hint ? html`<small>${this.t(hint)}</small>` : nothing}
    </label>`;
  }

  private globalField(
    label: string,
    key: 'title' | 'columns' | 'stack',
    type: FieldType = 'text',
    options: string[] = [],
  ): TemplateResult {
    const value = this.config?.[key];
    return html`<label class="field"
      ><span>${this.t(label)}</span>
      ${
        type === 'select'
          ? html`<select
              .value=${String(value ?? '')}
              @change=${(e: Event) =>
                this.edit((config) => {
                  (config as Record<string, unknown>)[key] = (e.target as HTMLSelectElement).value;
                })}
            >
              ${options.map((item) => html`<option value=${item}>${item ? this.t(item) : this.t('Automatic')}</option>`)}
            </select>`
          : html`<input
              type=${type}
              .value=${value === undefined ? '' : String(value)}
              @change=${(e: Event) =>
                this.edit((config) => {
                  const raw = (e.target as HTMLInputElement).value;
                  if (!raw) delete (config as Record<string, unknown>)[key];
                  else (config as Record<string, unknown>)[key] = type === 'number' ? Number(raw) : raw;
                })}
            />`
      }
    </label>`;
  }

  private renderEntities(): TemplateResult {
    const entries = this.entries();
    return html`<section class="panel">
      <div class="section-head">
        <div>
          <h3>${this.t('Entities')}</h3>
          <p>${this.t('Add, arrange, and customize each bar.')}</p>
        </div>
        <button class="primary" type="button" @click=${this.addEntity}>+ ${this.t('Add entity')}</button>
      </div>
      <div class="entity-list">
        ${entries.map((entry, index) => {
          const entity = typeof entry === 'string' ? entry : (entry.entity ?? '');
          return html`<div class="entity-row ${this.selected === index ? 'active' : ''}">
            <button
              type="button"
              class="entity-select"
              @click=${() => {
                this.selected = index;
                this.tab = 'appearance';
              }}
            >
              <span class="entity-index" aria-hidden="true">${index + 1}</span>
              <span class="entity-copy">
                <span class="entity-name"
                  >${this.hass?.states[entity]?.attributes.friendly_name || entity || this.t('Choose an entity')}</span
                >
                <small>${entity}</small>
              </span>
            </button>
            <div class="row-actions">
              <button
                type="button"
                aria-label=${this.t('Move up')}
                ?disabled=${index === 0}
                @click=${() => this.moveEntity(index, -1)}
              >
                ↑
              </button>
              <button
                type="button"
                aria-label=${this.t('Move down')}
                ?disabled=${index === entries.length - 1}
                @click=${() => this.moveEntity(index, 1)}
              >
                ↓
              </button>
              <button
                type="button"
                aria-label=${this.t('Remove')}
                ?disabled=${entries.length === 1}
                @click=${() => this.removeEntity(index)}
              >
                ×
              </button>
            </div>
          </div>`;
        })}
      </div>
      ${
        this.selected >= 0
          ? html`<div class="divider"></div>
              ${this.entityPicker()}`
          : nothing
      }
    </section>`;
  }

  private entityPicker(): TemplateResult {
    const entity = this.scope().entity ?? '';
    return html`<label class="field"
      ><span>${this.t('Selected entity')}</span>
      <ha-entity-picker
        .hass=${this.hass}
        .value=${entity}
        allow-custom-entity
        @value-changed=${(e: CustomEvent<{ value?: string }>) => this.change('entity', e.detail.value ?? '')}
      ></ha-entity-picker>
      <small>${this.t('Choose an entity using Home Assistant’s entity picker.')}</small>
    </label>`;
  }

  private renderAppearance(): TemplateResult {
    return html`<section class="panel">
      <h3>${this.t('Appearance')}</h3>
      <p>${this.t('Layout, color, and visible labels.')}</p>
      ${
        this.selected === -1
          ? html`<div class="fields">
              ${this.globalField('Card title', 'title')}
              ${this.globalField('Columns', 'columns', 'number')}${this.globalField('Stack', 'stack', 'select', ['', 'horizontal'])}
            </div>`
          : this.entityPicker()
      }
      <div class="fields">
        ${this.field('Name', 'name')}${this.field('Icon', 'icon', 'text', [], 'Example: mdi:lightning-bolt')}
        ${this.colorField()} ${this.field('Shape', 'shape', 'select', ['theme', 'square'])}
        ${this.field('Direction', 'direction', 'select', ['right', 'left', 'up', 'down'])}
        ${this.field('Height', 'height', 'text', [], 'Example: 40px or 180px for vertical bars')}
        ${this.field('Width', 'width', 'text', [], 'Example: 100% or 240px')}
        ${this.field(
          'Use in an entities card',
          'entity_row',
          'checkbox',
          [],
          'Removes the card background and outer spacing.',
        )}
        ${this.field(
          'Border radius',
          'border_radius',
          'text',
          [],
          'Example: 12px; empty uses the Home Assistant theme.',
        )}
        ${this.field('Use entity attributes as options', 'entity_config', 'checkbox')}
      </div>
      <h4>${this.t('Element positions')}</h4>
      <div class="fields">
        ${Object.keys(DEFAULT_POSITIONS).map((key) => this.positionField(key as keyof typeof DEFAULT_POSITIONS))}
      </div>
    </section>`;
  }

  private positionField(key: keyof typeof DEFAULT_POSITIONS): TemplateResult {
    const current = this.scope().positions?.[key];
    return html`<label class="field"
      ><span>${this.t(key[0].toUpperCase() + key.slice(1))}</span>
      <select
        .value=${String(current ?? '')}
        @change=${(e: Event) =>
          this.edit((_config, scope) => {
            const positions = { ...scope.positions };
            const value = (e.target as HTMLSelectElement).value;
            if (value) positions[key] = value as 'inside' | 'outside' | 'off';
            else delete positions[key];
            scope.positions = positions;
          })}
      >
        <option value="">
          ${this.selected !== -1 ? this.t('Inherited') : `${this.t('Default')} (${this.t(DEFAULT_POSITIONS[key])})`}
        </option>
        ${['inside', 'outside', 'off'].map((option) => html`<option value=${option}>${this.t(option)}</option>`)}
      </select></label
    >`;
  }

  private colorField(): TemplateResult {
    const color = this.scope().color ?? '';
    const pickerColor = /^#[0-9a-fA-F]{6}$/.test(color) ? color : '#0d8ac7';
    return html`<label class="field"
      ><span>${this.t('Color')}</span
      ><span class="color-control">
        <input
          type="color"
          .value=${pickerColor}
          aria-label=${this.t('Choose color')}
          @change=${(e: Event) => this.change('color', (e.target as HTMLInputElement).value)}
        />
        <input
          type="text"
          .value=${color}
          placeholder=${this.t('Theme color or CSS value')}
          @change=${(e: Event) => this.change('color', (e.target as HTMLInputElement).value)}
        /> </span
      ><small>${this.t('Choose a color or enter a theme variable.')}</small></label
    >`;
  }

  private renderValues(): TemplateResult {
    const animation = this.scope().animation ?? {};
    const mode = animation.mode ?? this.config?.animation?.mode ?? 'change';
    const enabled = (animation.state ?? this.config?.animation?.state ?? 'on') !== 'off';
    return html`<section class="panel">
      <h3>${this.t('Values')}</h3>
      <p>${this.t('Set the range, number format, and animation.')}</p>
      <div class="fields">
        ${this.field('Attribute', 'attribute', 'text', [], 'Leave blank for entity state')}
        ${this.field('Minimum', 'min', 'number')}${this.field('Maximum', 'max', 'number')}
        ${this.field('Target marker', 'target', 'number', [], 'Zero is a valid target')}
        ${this.field('Decimals', 'decimal', 'number')}${this.field('Unit', 'unit_of_measurement')}
        ${this.field('Limit displayed value to range', 'limit_value', 'checkbox')}
        ${this.field('Show complementary value', 'complementary', 'checkbox')}
      </div>
      <h4>${this.t('Animation')}</h4>
      <div class="fields">
        <label class="field"
          ><span>${this.t('Animated bar')}</span
          ><input
            type="checkbox"
            .checked=${enabled}
            @change=${(e: Event) =>
              this.edit((_config, scope) => {
                scope.animation = {
                  ...scope.animation,
                  state: (e.target as HTMLInputElement).checked ? 'on' : 'off',
                };
              })}
        /></label>
        <label class="field"
          ><span>${this.t('Animation mode')}</span>
          <select
            .value=${String(animation.mode ?? '')}
            @change=${(e: Event) =>
              this.edit((_config, scope) => {
                const value = (e.target as HTMLSelectElement).value;
                scope.animation = {
                  ...scope.animation,
                  mode: (value || undefined) as 'change' | 'pulse' | 'both' | undefined,
                };
              })}
          >
            <option value="">
              ${this.selected === -1 ? this.t('Default (change)') : this.t('Inherited')}
            </option>
            ${['change', 'pulse', 'both'].map((item) => html`<option value=${item}>${this.t(item)}</option>`)}
          </select></label
        >
        ${
          mode === 'change' || mode === 'both'
            ? html`<label class="field"
                ><span>${this.t('Change duration in seconds')}</span>
                <input
                  type="number"
                  min="0.1"
                  max="5"
                  step="0.1"
                  .value=${String(animation.duration ?? '')}
                  placeholder="0.7"
                  @change=${(e: Event) =>
                    this.edit((_config, scope) => {
                      const value = (e.target as HTMLInputElement).value;
                      scope.animation = { ...scope.animation, duration: value ? Number(value) : undefined };
                    })}
              /></label>`
            : nothing
        }
        ${
          mode === 'pulse' || mode === 'both'
            ? html`<label class="field"
                ><span>${this.t('Pulse speed in seconds')}</span>
                <input
                  type="number"
                  min="0.2"
                  step="0.1"
                  .value=${String(animation.speed ?? '')}
                  placeholder="5"
                  @change=${(e: Event) =>
                    this.edit((_config, scope) => {
                      const value = (e.target as HTMLInputElement).value;
                      scope.animation = { ...scope.animation, speed: value ? Number(value) : undefined };
                    })}
              /></label>`
            : nothing
        }
      </div>
    </section>`;
  }

  private renderRules(): TemplateResult {
    const rules = this.scope().severity ?? [];
    return html`<section class="panel">
      <div class="section-head">
        <div>
          <h3>${this.t('Severity rules')}</h3>
          <p>${this.t('Choose a color or icon for ranges and text states.')}</p>
        </div>
        <button
          type="button"
          class="primary"
          @click=${() =>
            this.edit((_config, scope) => {
              scope.severity = [...(scope.severity ?? []), { from: 0, to: 100, color: '#4caf50' }];
            })}
        >
          + ${this.t('Add rule')}
        </button>
      </div>
      ${
        rules.length
          ? rules.map(
              (rule, index) =>
                html`<div class="rule">
                  <div class="rule-head">
                    <strong>${this.t('Rule')} ${index + 1}</strong>
                    <button
                      type="button"
                      aria-label=${this.t('Remove rule')}
                      @click=${() =>
                        this.edit((_config, scope) => {
                          scope.severity = scope.severity?.filter((_item, i) => i !== index);
                        })}
                    >
                      ×
                    </button>
                  </div>
                  <div class="fields">
                    ${this.ruleField(index, rule, 'from', 'From', 'number')}${this.ruleField(index, rule, 'to', 'To', 'number')}
                    ${this.ruleField(index, rule, 'text', 'Text state')}${this.ruleField(index, rule, 'color', 'Color')}
                    ${this.ruleField(index, rule, 'icon', 'Icon')}${this.ruleField(index, rule, 'hide', 'Hide bar', 'checkbox')}
                  </div>
                </div>`,
            )
          : html`<p class="empty">
              ${this.t('No rules yet. Add one to change the bar based on its value.')}
            </p>`
      }
    </section>`;
  }

  private ruleField(
    index: number,
    rule: SeverityRule,
    key: keyof SeverityRule,
    label: string,
    type: FieldType = 'text',
  ): TemplateResult {
    return html`<label class="field"
      ><span>${this.t(label)}</span>
      <input
        type=${type}
        .checked=${type === 'checkbox' ? Boolean(rule[key]) : false}
        .value=${type === 'checkbox' ? '' : String(rule[key] ?? '')}
        @change=${(e: Event) =>
          this.edit((_config, scope) => {
            const rules = [...(scope.severity ?? [])];
            const raw =
              type === 'checkbox'
                ? (e.target as HTMLInputElement).checked
                : (e.target as HTMLInputElement).value;
            const updated = { ...rules[index] } as Record<string, unknown>;
            if (raw === '') delete updated[key];
            else updated[key] = type === 'number' ? Number(raw) : raw;
            rules[index] = updated;
            scope.severity = rules;
          })}
    /></label>`;
  }

  private renderActions(): TemplateResult {
    return html`<section class="panel">
      <h3>${this.t('Actions')}</h3>
      <p>${this.t('What happens when someone taps, holds, or double taps a bar.')}</p>
      ${this.actionEditor('tap_action', 'Tap')}${this.actionEditor('hold_action', 'Hold')}${this.actionEditor('double_tap_action', 'Double tap')}
    </section>`;
  }

  private actionEditor(
    key: 'tap_action' | 'hold_action' | 'double_tap_action',
    label: string,
  ): TemplateResult {
    const action = this.scope()[key];
    const kind = action?.action ?? '';
    const actionField = (name: string, property: string, type = 'text') =>
      html`<label class="field"
        ><span>${this.t(name)}</span>
        <input
          type=${type}
          .value=${String(action?.[property] ?? '')}
          @change=${(e: Event) =>
            this.edit((_config, scope) => {
              const current = { ...(scope[key] ?? { action: kind }) };
              const value = (e.target as HTMLInputElement).value;
              if (value) current[property] = value;
              else delete current[property];
              scope[key] = current;
            })}
      /></label>`;
    const target = action?.target as Record<string, unknown> | undefined;
    const legacyData = action?.service_data as Record<string, unknown> | undefined;
    const targetEntity = String(target?.entity_id ?? legacyData?.entity_id ?? '');
    return html`<div class="action-block">
      <h4>${this.t(label)}</h4>
      <div class="fields">
        <label class="field"
          ><span>${this.t('Action')}</span
          ><select
            .value=${kind}
            @change=${(e: Event) =>
              this.edit((_config, scope) => {
                const value = (e.target as HTMLSelectElement).value;
                if (value) scope[key] = { action: value };
                else delete scope[key];
              })}
          >
            ${['', 'more-info', 'toggle', 'navigate', 'url', 'perform-action', 'call-service', 'assist', 'none'].map((item) => html`<option value=${item}>${item || this.t('Default / inherit')}</option>`)}
          </select></label
        >
        ${kind === 'navigate' ? actionField('Navigation path', 'navigation_path') : nothing}
        ${kind === 'url' ? actionField('URL', 'url_path') : nothing}
        ${
          kind === 'perform-action' || kind === 'call-service'
            ? html` ${actionField('Service / action', kind === 'perform-action' ? 'perform_action' : 'service')}
                <label class="field"
                  ><span>${this.t('Target entity ID')}</span
                  ><input
                    type="text"
                    .value=${targetEntity}
                    @change=${(e: Event) =>
                      this.edit((_config, scope) => {
                        const current = { ...(scope[key] ?? { action: kind }) };
                        const value = (e.target as HTMLInputElement).value;
                        if (kind === 'call-service')
                          current.service_data = {
                            ...((current.service_data as Record<string, unknown>) ?? {}),
                            entity_id: value,
                          };
                        else
                          current.target = {
                            ...((current.target as Record<string, unknown>) ?? {}),
                            entity_id: value,
                          };
                        scope[key] = current;
                      })}
                /></label>`
            : nothing
        }
        ${kind === 'more-info' || kind === 'toggle' || kind === 'assist' ? actionField('Entity ID (optional)', 'entity') : nothing}
        ${
          kind === 'navigate'
            ? html`<label class="field"
                ><span>${this.t('Replace browser history')}</span
                ><input
                  type="checkbox"
                  .checked=${Boolean(action?.navigation_replace)}
                  @change=${(e: Event) =>
                    this.edit((_config, scope) => {
                      scope[key] = {
                        ...(scope[key] ?? { action: kind }),
                        navigation_replace: (e.target as HTMLInputElement).checked,
                      };
                    })}
              /></label>`
            : nothing
        }
        ${
          kind === 'assist'
            ? html`<label class="field"
                ><span>${this.t('Start listening')}</span
                ><input
                  type="checkbox"
                  .checked=${Boolean(action?.start_listening)}
                  @change=${(e: Event) =>
                    this.edit((_config, scope) => {
                      scope[key] = {
                        ...(scope[key] ?? { action: kind }),
                        start_listening: (e.target as HTMLInputElement).checked,
                      };
                    })}
              /></label>`
            : nothing
        }
        ${kind === 'assist' ? actionField('Pipeline ID (optional)', 'pipeline_id') : nothing}
        ${
          kind
            ? html`<label class="field"
                ><span>${this.t('Ask for confirmation')}</span
                ><input
                  type="checkbox"
                  .checked=${Boolean(action?.confirmation)}
                  @change=${(e: Event) =>
                    this.edit((_config, scope) => {
                      scope[key] = {
                        ...(scope[key] ?? { action: kind }),
                        confirmation: (e.target as HTMLInputElement).checked,
                      };
                    })}
              /></label>`
            : nothing
        }
      </div>
      ${
        kind === 'perform-action' || kind === 'call-service'
          ? html`<label class="field full"
              ><span>${this.t('Action data (JSON object)')}</span>
              <textarea
                rows="3"
                .value=${JSON.stringify(action?.data ?? action?.service_data ?? {}, null, 2)}
                @change=${(e: Event) => {
                  try {
                    const data = JSON.parse((e.target as HTMLTextAreaElement).value);
                    if (typeof data !== 'object' || Array.isArray(data) || data === null)
                      throw new Error('Enter a JSON object');
                    this.edit((_config, scope) => {
                      scope[key] = {
                        ...(scope[key] ?? { action: kind }),
                        [kind === 'call-service' ? 'service_data' : 'data']: data,
                      };
                    });
                  } catch {
                    this.error = this.t('Action data must be a valid JSON object.');
                  }
                }}
              ></textarea>
            </label>`
          : nothing
      }
    </div>`;
  }

  protected render(): TemplateResult {
    if (!this.config) return html``;
    const tabs: Array<[Tab, string]> = [
      ['entities', 'Entities'],
      ['appearance', 'Appearance'],
      ['values', 'Values'],
      ['rules', 'Rules'],
      ['actions', 'Actions'],
    ];
    return html`<div class="editor">
      <header>
        <div>
          <h2>Bar Card Next</h2>
          <p>${this.t('Build clear, useful bars for your dashboard.')}</p>
        </div>
        <span class="scope"
          >${this.t('Editing:')}
          ${this.selected === -1 ? this.t('All bars') : this.selectedLabel()}</span
        >
      </header>
      <div class="scope-switch">
        <button
          type="button"
          class=${this.selected === -1 ? 'active' : ''}
          @click=${() => {
            this.selected = -1;
          }}
        >
          ${this.t('All bars')}
        </button>
        ${this.entries().map(
          (entry, index) =>
            html`<button
              type="button"
              class=${this.selected === index ? 'active' : ''}
              aria-label=${`${this.t('Bar')} ${index + 1}`}
              @click=${() => {
                this.selected = index;
              }}
            >
              ${index + 1}
            </button>`,
        )}
      </div>
      <nav aria-label=${this.t('Editor sections')}>
        ${tabs.map(
          ([tab, label]) =>
            html`<button
              type="button"
              class=${this.tab === tab ? 'active' : ''}
              @click=${() => {
                this.tab = tab;
              }}
            >
              ${this.t(label)}
            </button>`,
        )}
      </nav>
      ${this.error ? html`<div class="error" role="alert">${this.error}</div>` : nothing}
      ${this.tab === 'entities' ? this.renderEntities() : this.tab === 'appearance' ? this.renderAppearance() : this.tab === 'values' ? this.renderValues() : this.tab === 'rules' ? this.renderRules() : this.renderActions()}
    </div>`;
  }

  static styles = css`
    :host {
      display: block;
      color: var(--primary-text-color);
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    * {
      box-sizing: border-box;
    }
    .editor {
      background: var(--card-background-color, #fff);
      border: 1px solid var(--divider-color, #ddd);
      border-radius: var(--ha-card-border-radius, 12px);
      overflow: hidden;
    }
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 22px 22px 14px;
    }
    h2,
    h3,
    h4,
    p {
      margin: 0;
    }
    h2 {
      font-size: 1.25rem;
    }
    h3 {
      font-size: 1.05rem;
    }
    h4 {
      font-size: 0.9rem;
      margin: 22px 0 12px;
    }
    p,
    small {
      color: var(--secondary-text-color);
    }
    p {
      margin-top: 4px;
      font-size: 0.88rem;
    }
    .scope {
      background: var(--secondary-background-color, #eee);
      padding: 7px 10px;
      border-radius: 99px;
      font-size: 0.8rem;
      white-space: nowrap;
    }
    .scope-switch {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding: 0 22px 14px;
    }
    .scope-switch button {
      border-radius: 99px;
      white-space: nowrap;
    }
    nav {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      border-top: 1px solid var(--divider-color, #ddd);
      border-bottom: 1px solid var(--divider-color, #ddd);
      padding: 5px 14px;
    }
    button {
      font: inherit;
      color: inherit;
      background: transparent;
      border: 0;
      cursor: pointer;
      padding: 8px 10px;
    }
    button:hover {
      background: var(--secondary-background-color, #eee);
    }
    button:focus-visible,
    input:focus-visible,
    select:focus-visible,
    textarea:focus-visible {
      outline: 2px solid var(--primary-color);
      outline-offset: 2px;
    }
    button:disabled {
      opacity: 0.35;
      cursor: default;
    }
    nav button {
      white-space: nowrap;
      border-radius: 8px;
      font-size: 0.88rem;
    }
    nav button.active,
    .scope-switch button.active {
      color: var(--primary-color);
      background: var(--secondary-background-color, #eee);
      font-weight: 600;
    }
    .panel {
      padding: 22px;
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      margin-bottom: 16px;
    }
    .primary {
      background: var(--primary-color);
      color: var(--text-primary-color, white);
      border-radius: 9px;
      white-space: nowrap;
    }
    .primary:hover {
      filter: brightness(1.08);
      background: var(--primary-color);
    }
    .fields {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      margin-top: 16px;
    }
    .field {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
      font-size: 0.86rem;
      font-weight: 600;
    }
    .field small {
      font-size: 0.74rem;
      font-weight: 400;
    }
    input:not([type='checkbox']),
    select,
    textarea {
      width: 100%;
      min-height: 40px;
      padding: 8px 10px;
      border: 1px solid var(--divider-color, #bbb);
      border-radius: 8px;
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color);
      font: inherit;
      font-weight: 400;
    }
    input[type='checkbox'] {
      width: 20px;
      height: 20px;
      accent-color: var(--primary-color);
    }
    .color-control {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .color-control input[type='color'] {
      width: 44px;
      min-width: 44px;
      height: 40px;
      padding: 3px;
      cursor: pointer;
    }
    .full {
      margin-top: 12px;
    }
    .entity-list {
      display: grid;
      gap: 6px;
    }
    .entity-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 10px;
    }
    .entity-row.active {
      border-color: var(--primary-color);
    }
    .entity-select {
      flex: 1;
      display: flex;
      align-items: center;
      gap: 10px;
      min-width: 0;
      text-align: left;
    }
    .entity-copy {
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .entity-index {
      flex: none;
      display: inline-grid;
      place-items: center;
      width: 24px;
      height: 24px;
      margin: 0 0 0 8px;
      border-radius: 50%;
      background: var(--secondary-background-color, #eee);
      color: var(--primary-color);
      font-size: 0.78rem;
      font-weight: 700;
    }
    .entity-select small,
    .entity-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 100%;
    }
    .row-actions {
      display: flex;
    }
    .row-actions button {
      font-size: 1.15rem;
    }
    .divider {
      border-top: 1px solid var(--divider-color, #ddd);
      margin: 20px 0;
    }
    .rule,
    .action-block {
      border: 1px solid var(--divider-color, #ddd);
      border-radius: 12px;
      padding: 16px;
      margin-top: 14px;
    }
    .rule-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .empty {
      padding: 24px;
      text-align: center;
      background: var(--secondary-background-color, #eee);
      border-radius: 10px;
    }
    .error {
      margin: 14px 22px 0;
      color: var(--error-color, #b00020);
    }
    @media (max-width: 560px) {
      header {
        align-items: flex-start;
        flex-direction: column;
      }
      .fields {
        grid-template-columns: 1fr;
      }
      .section-head {
        align-items: flex-start;
        flex-direction: column;
      }
    }
  `;
}
