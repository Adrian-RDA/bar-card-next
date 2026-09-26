import { describe, expect, it } from 'vitest';
import {
  displayValue,
  matchingSeverity,
  numericValue,
  percent,
  resolveBars,
  validateConfig,
  valueChange,
} from './config';
import type { BarCardConfig, ResolvedBar } from './types';

const state = {
  state: '42',
  attributes: { friendly_name: 'Battery', unit_of_measurement: '%', icon: 'mdi:battery' },
};

describe('configuration compatibility', () => {
  it('accepts a single legacy entity and applies defaults', () => {
    const config: BarCardConfig = { entity: 'sensor.battery' };
    expect(() => validateConfig(config)).not.toThrow();
    const [bar] = resolveBars(config, { 'sensor.battery': state });
    expect(bar.entity).toBe('sensor.battery');
    expect(bar.positions.name).toBe('inside');
    expect(bar.max).toBe(100);
  });

  it('keeps per entity overrides and merges nested positions', () => {
    const config: BarCardConfig = {
      entities: ['sensor.battery', { entity: 'sensor.other', max: 200, positions: { value: 'outside' } }],
      max: 100,
      positions: { icon: 'off' },
    };
    const bars = resolveBars(config, { 'sensor.battery': state });
    expect(bars[0].positions.icon).toBe('off');
    expect(bars[1].positions.icon).toBe('off');
    expect(bars[1].positions.value).toBe('outside');
    expect(bars[1].max).toBe(200);
  });

  it('inherits shape and animation while allowing per-bar overrides', () => {
    const config: BarCardConfig = {
      entities: ['sensor.battery', { entity: 'sensor.other', shape: 'theme', animation: { mode: 'pulse' } }],
      shape: 'square',
      animation: { duration: 1.2 },
    };
    const bars = resolveBars(config, { 'sensor.battery': state });
    expect(bars[0].shape).toBe('square');
    expect(bars[0].animation).toMatchObject({ state: 'on', mode: 'change', duration: 1.2 });
    expect(bars[1].shape).toBe('theme');
    expect(bars[1].animation).toMatchObject({ state: 'on', mode: 'pulse', duration: 1.2 });
  });

  it('rejects missing entities and invalid columns', () => {
    expect(() => validateConfig({})).toThrow();
    expect(() => validateConfig({ entity: 'sensor.a', columns: 0 })).toThrow();
  });
});

describe('bar values', () => {
  it('detects numeric changes without animating the initial state', () => {
    expect(valueChange(undefined, 42)).toBeUndefined();
    expect(valueChange(42, 42)).toBeUndefined();
    expect(valueChange(42, 55)).toBe('increase');
    expect(valueChange(55, 42)).toBe('decrease');
    expect(valueChange(42, undefined)).toBeUndefined();
  });
  it('handles unavailable values and invalid ranges without NaN', () => {
    expect(numericValue('unavailable')).toBeUndefined();
    expect(numericValue('12.5')).toBe(12.5);
    expect(percent(undefined, 0, 100)).toBe(0);
    expect(percent(50, 100, 100)).toBe(0);
    expect(percent(150, 0, 100)).toBe(100);
  });

  it('supports a target of zero and exact decimal formatting', () => {
    expect(percent(0, 0, 100)).toBe(0);
    const bar = { max: 100, decimal: 0 } as ResolvedBar;
    expect(displayValue(42.6, bar, '%')).toBe('43 %');
  });

  it('applies the last matching severity rule', () => {
    const rules = [
      { from: 0, to: 50, color: 'yellow' },
      { from: 25, to: 75, color: 'orange' },
      { text: 'charging', color: 'blue' },
    ];
    expect(matchingSeverity('42', rules)?.color).toBe('orange');
    expect(matchingSeverity('charging', rules)?.color).toBe('blue');
  });
});
