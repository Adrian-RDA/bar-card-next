# Bar Card

A flexible bar card for Home Assistant dashboards. Version 4 brings a redesigned card, a complete graphical editor, keyboard support, Sections sizing, and a modern Lit build.

## Install

Add this repository as a custom **Dashboard** repository in HACS. After installing a release, add the `bar-card.js` resource if HACS has not registered it automatically:

```yaml
url: /hacsfiles/bar-card/bar-card.js
type: module
```

Then add a card through the dashboard editor and select **Bar Card**. The graphical editor supports entities, per-entity overrides, layout, value formatting, element positions, severity rules, animation, and tap/hold/double-tap actions. Labels follow the Home Assistant language setting in English and German.

## Quick start

```yaml
type: custom:bar-card
title: Home overview
entities:
  - entity: sensor.battery
    name: Battery
    target: 80
    severity:
      - from: 0
        to: 25
        color: '#d94848'
      - from: 26
        to: 100
        color: '#13a88a'
  - entity: sensor.temperature
    min: 0
    max: 35
    decimal: 1
```

The original single-entity form still works:

```yaml
type: custom:bar-card
entity: sensor.example
```

## Options

Global options apply to every bar. Options inside an `entities` item override the global value. Entity items can be strings or objects.

| Option                                           | Default                | Description                                          |
| ------------------------------------------------ | ---------------------- | ---------------------------------------------------- |
| `entity` / `entities`                            | Required               | One entity or an array of entities.                  |
| `title`                                          | None                   | Card heading.                                        |
| `columns`                                        | `1`                    | Number of bars per row.                              |
| `stack`                                          | None                   | `horizontal` places all bars in one row.             |
| `direction`                                      | `right`                | `right`, `left`, `up`, or `down`.                    |
| `height`                                         | `40px`                 | Bar height; use a larger value for vertical bars.    |
| `width`                                          | `100%`                 | Width of the bar track.                              |
| `color`                                          | Theme primary color    | Any CSS color or theme variable.                     |
| `name`, `icon`                                   | Entity attributes      | Label and icon overrides.                            |
| `attribute`                                      | State                  | Attribute to display instead of entity state.        |
| `min`, `max`                                     | `0`, `100`             | Numeric bar range.                                   |
| `target`                                         | None                   | Target marker. `0` is supported.                     |
| `decimal`                                        | None                   | Fixed number of decimal places, including `0`.       |
| `unit_of_measurement`                            | Entity attribute       | Unit shown beside values.                            |
| `limit_value`                                    | `false`                | Clamp the displayed value to the range.              |
| `complementary`                                  | `false`                | Display `max - value`.                               |
| `positions`                                      | See below              | Place the icon, indicator, name, min/max, and value. |
| `severity`                                       | None                   | Rules for color, icon, or visibility.                |
| `animation`                                      | Off                    | Animated fill with configurable speed.               |
| `entity_row`                                     | `false`                | Transparent background for use in an entities card.  |
| `entity_config`                                  | `false`                | Read supported card options from entity attributes.  |
| `tap_action`, `hold_action`, `double_tap_action` | Home Assistant default | Standard Home Assistant card actions.                |

`positions` supports `inside`, `outside`, or `off` for each element. Defaults: icon and indicator outside; name and value inside; min/max off.

```yaml
positions:
  icon: outside
  indicator: outside
  name: inside
  minmax: off
  value: inside
```

Severity rules match a numeric inclusive range (`from`/`to`) or an exact text state (`text`). Later matching rules take precedence. Each rule may specify `color`, `icon`, or `hide: true`.

```yaml
animation:
  state: 'on'
  speed: 5
```

## Upgrading from 3.x

Existing `entity`, `entities`, range, position, severity, animation, action, and entity-row configurations remain supported. The card now treats unavailable and nonnumeric states as empty bars, clamps the visual fill to 0–100%, and shows a target at zero. The updated editor does not rewrite YAML when opened; it converts the single-entity form to `entities` only after an edit.

The rendered markup and CSS have changed. Custom `card-mod` selectors targeting the old internal structure may need adjustment. Prefer the theme variables `--bar-card-color`, `--bar-card-border-radius`, and `--bar-card-disabled-color` where possible.

## Development

Requires Node.js 24 and pnpm 11.

```sh
pnpm install
pnpm dev
```

The local preview at `http://localhost:5173/` contains sample cards and an editor. Run all checks with:

```sh
pnpm check
```

`pnpm build` creates `dist/bar-card.js`. Tags beginning with `v` run the release workflow, which checks the project and attaches this file to a GitHub release for HACS.

## License

MIT. Original project by Lucas Bramlage and contributors.
