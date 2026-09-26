import type { BarCardConfig, BarOptions, HassEntity, ResolvedBar, SeverityRule } from './types';

export const DEFAULT_POSITIONS = {
  icon: 'outside',
  indicator: 'outside',
  name: 'inside',
  minmax: 'off',
  value: 'inside',
} as const;

const DEFAULTS = {
  color: 'var(--bar-card-color, var(--ha-progress-bar-indicator-color, var(--primary-color)))',
  min: 0,
  max: 100,
  direction: 'right',
  animation: { state: 'on', speed: 5, duration: 0.7, mode: 'change' },
};

export function validateConfig(config: BarCardConfig): void {
  if (!config || typeof config !== 'object') throw new Error('Invalid bar-card configuration');
  const entities = config.entities ?? (config.entity ? [config.entity] : []);
  if (!Array.isArray(entities) || !entities.length) throw new Error('Choose at least one entity');
  if (
    entities.some(
      (item) => !((typeof item === 'string' && item) || (typeof item === 'object' && item?.entity)),
    )
  ) {
    throw new Error('Every bar needs an entity');
  }
  if (
    config.columns !== undefined &&
    (!Number.isInteger(Number(config.columns)) || Number(config.columns) < 1)
  ) {
    throw new Error('Columns must be a positive integer');
  }
}

export function resolveBars(config: BarCardConfig, states: Record<string, HassEntity>): ResolvedBar[] {
  const entities = config.entities ?? (config.entity ? [config.entity] : []);
  const {
    entities: _entities,
    columns: _columns,
    stack: _stack,
    title: _title,
    type: _type,
    ...global
  } = config;
  void [_entities, _columns, _stack, _title, _type];
  return entities.map((entry) => {
    const local: BarOptions = typeof entry === 'string' ? { entity: entry } : entry;
    const state = states[local.entity ?? ''];
    const attributes = (global.entity_config || local.entity_config) && state ? state.attributes : {};
    const overrides: BarOptions = {};
    for (const key of Object.keys(DEFAULTS).concat([
      'name',
      'icon',
      'unit_of_measurement',
      'target',
      'decimal',
      'height',
      'width',
      'positions',
      'severity',
    ])) {
      if (key in attributes) (overrides as Record<string, unknown>)[key] = attributes[key];
    }
    const merged = { ...global, ...overrides, ...local };
    return {
      ...DEFAULTS,
      ...merged,
      entity: local.entity ?? config.entity ?? '',
      color: merged.color || DEFAULTS.color,
      min: Number(merged.min ?? DEFAULTS.min),
      max: Number(merged.max ?? DEFAULTS.max),
      direction: merged.direction || DEFAULTS.direction,
      positions: { ...DEFAULT_POSITIONS, ...global.positions, ...overrides.positions, ...local.positions },
      animation: { ...DEFAULTS.animation, ...global.animation, ...overrides.animation, ...local.animation },
    } as ResolvedBar;
  });
}

export function numericValue(value: unknown): number | undefined {
  if (
    value === null ||
    value === undefined ||
    value === '' ||
    value === 'unknown' ||
    value === 'unavailable'
  ) {
    return undefined;
  }
  const number = typeof value === 'number' ? value : Number(value);
  return Number.isFinite(number) ? number : undefined;
}

export function percent(value: number | undefined, min: number, max: number): number {
  if (value === undefined || !Number.isFinite(min) || !Number.isFinite(max) || max <= min) return 0;
  return Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));
}

export function valueChange(
  previous: number | undefined,
  current: number | undefined,
): 'increase' | 'decrease' | undefined {
  if (previous === undefined || current === undefined || current === previous) return undefined;
  return current > previous ? 'increase' : 'decrease';
}

export function matchingSeverity(
  value: unknown,
  rules: SeverityRule[] | undefined,
): SeverityRule | undefined {
  const number = numericValue(value);
  return [...(rules ?? [])]
    .reverse()
    .find((rule) =>
      number === undefined
        ? rule.text !== undefined && rule.text === String(value)
        : rule.from !== undefined &&
          rule.to !== undefined &&
          number >= Number(rule.from) &&
          number <= Number(rule.to),
    );
}

export function displayValue(value: unknown, bar: ResolvedBar, unit: string): string {
  const number = numericValue(value);
  if (number === undefined) return String(value ?? 'unknown');
  const shown = bar.complementary ? bar.max - number : number;
  const digits = bar.decimal === undefined ? undefined : Math.max(0, Math.min(10, Number(bar.decimal)));
  const formatted = digits === undefined ? String(Math.round(shown * 1000) / 1000) : shown.toFixed(digits);
  return `${formatted}${unit ? ` ${unit}` : ''}`;
}
