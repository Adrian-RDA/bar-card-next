export interface HassEntity {
  state: string;
  attributes: Record<string, unknown> & {
    friendly_name?: string;
    icon?: string;
    unit_of_measurement?: string;
  };
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  locale?: { language?: string };
  language?: string;
}

export interface ActionConfig {
  action: string;
  [key: string]: unknown;
}

export interface SeverityRule {
  from?: number;
  to?: number;
  text?: string;
  color?: string;
  icon?: string;
  hide?: boolean;
}

export type Placement = 'inside' | 'outside' | 'off';

export interface BarPositions {
  icon?: Placement;
  indicator?: Placement;
  name?: Placement;
  minmax?: Placement;
  value?: Placement;
}

export interface BarAnimation {
  state?: 'on' | 'off';
  speed?: number;
  duration?: number;
  mode?: 'change' | 'pulse' | 'both';
}

export interface BarOptions {
  entity?: string;
  attribute?: string;
  name?: string;
  icon?: string;
  color?: string;
  shape?: 'theme' | 'square';
  min?: number;
  max?: number;
  target?: number;
  decimal?: number;
  unit_of_measurement?: string;
  limit_value?: boolean;
  complementary?: boolean;
  direction?: string;
  height?: string | number;
  width?: string;
  border_radius?: string | number;
  positions?: BarPositions;
  severity?: SeverityRule[];
  animation?: BarAnimation;
  entity_config?: boolean;
  entity_row?: boolean;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}

export interface BarCardConfig extends BarOptions {
  type?: string;
  title?: string;
  entities?: Array<string | BarOptions>;
  columns?: number;
  stack?: string;
}

export interface ResolvedBar extends BarOptions {
  entity: string;
  color: string;
  min: number;
  max: number;
  direction: string;
  positions: Required<BarPositions>;
  animation: Required<BarAnimation>;
}
