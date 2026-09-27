# Bar Card Next

A flexible bar card for Home Assistant dashboards. Bar Card Next uses Home Assistant theme colors and card geometry by default, with an optional square style, value-change animation, a graphical editor, keyboard support, Sections sizing, and a modern Lit build.

## Install

Add the separate **bar-card-next** repository as a custom **Dashboard** repository in HACS. After installation, add the `bar-card-next.js` resource if HACS has not registered it automatically:

```yaml
url: /hacsfiles/bar-card-next/bar-card-next.js
type: module
```

Then add a card through the dashboard editor and select **Bar Card Next**. The graphical editor supports entities, per-entity overrides, layout, value formatting, element positions, severity rules, animation, and tap/hold/double-tap actions. Labels follow the Home Assistant language setting in English and German.

The original Bar Card and Bar Card Next can be installed together. They register different card types (`custom:bar-card` and `custom:bar-card-next`), use different JavaScript resources, and can be placed side by side on a dashboard. For separate HACS installation, publish this project under its own repository name, `bar-card-next`; HACS expects the release asset to match the repository name. Existing dashboards keep their original `custom:bar-card` entries until you choose to replace them.

## Quick start

```yaml
type: custom:bar-card-next
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
type: custom:bar-card-next
entity: sensor.example
```

## Options

Global options apply to every bar. Options inside an `entities` item override the global value. Entity items can be strings or objects.

| Option                                           | Default                | Description                                                               |
| ------------------------------------------------ | ---------------------- | ------------------------------------------------------------------------- |
| `entity` / `entities`                            | Required               | One entity or an array of entities.                                       |
| `title`                                          | None                   | Card heading.                                                             |
| `columns`                                        | `1`                    | Number of bars per row.                                                   |
| `stack`                                          | None                   | `horizontal` places all bars in one row.                                  |
| `direction`                                      | `right`                | `right`, `left`, `up`, or `down`.                                         |
| `height`                                         | `40px`                 | Bar height; use a larger value for vertical bars.                         |
| `width`                                          | `100%`                 | Width of the bar track.                                                   |
| `color`                                          | Theme primary color    | Any CSS color or theme variable.                                          |
| `shape`                                          | `theme`                | `theme` follows Home Assistant radii; `square` uses square card and bars. |
| `name`, `icon`                                   | Entity attributes      | Label and icon overrides.                                                 |
| `attribute`                                      | State                  | Attribute to display instead of entity state.                             |
| `min`, `max`                                     | `0`, `100`             | Numeric bar range.                                                        |
| `target`                                         | None                   | Target marker. `0` is supported.                                          |
| `decimal`                                        | None                   | Fixed number of decimal places, including `0`.                            |
| `unit_of_measurement`                            | Entity attribute       | Unit shown beside values.                                                 |
| `limit_value`                                    | `false`                | Clamp the displayed value to the range.                                   |
| `complementary`                                  | `false`                | Display `max - value`.                                                    |
| `positions`                                      | See below              | Place the icon, indicator, name, min/max, and value.                      |
| `severity`                                       | None                   | Rules for color, icon, or visibility.                                     |
| `animation`                                      | Value changes on       | Animate changes, pulse continuously, or both.                             |
| `entity_row`                                     | `false`                | Use the bar inside an entities card (transparent background and no outer spacing). |
| `border_radius`                                  | HA theme               | Bar/card corner radius, for example `12px`; empty follows Home Assistant's radius. |
| `entity_config`                                  | `false`                | Read supported card options from entity attributes.                       |
| `tap_action`, `hold_action`, `double_tap_action` | Home Assistant default | Standard Home Assistant card actions.                                     |

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
  mode: change
  duration: 0.7
```

The default animates the bar to new numeric values over 0.7 seconds and briefly highlights the change. Initial values render without a change highlight. To use the earlier continuous pulse effect, set `mode: pulse`; `mode: both` combines it with value-change animation. `speed` controls the pulse period in seconds. Set `state: 'off'` to stop animations. Home Assistant's reduced-motion setting is respected.

For square corners:

```yaml
shape: square
```

### Home Assistant layout settings

For the card section to size itself to the bars, enable Home Assistant's **Automatic height** layout option. With a fixed section height, the dashboard reserves more space than the card content needs. This is especially noticeable when `entity_row` is disabled; automatic height also prevents the card background from extending beyond its visual container.

## Upgrading from 3.x

Existing `entity`, `entities`, range, position, severity, animation, action, and entity-row configurations remain supported when their card type is changed to `custom:bar-card-next`. The card treats unavailable and nonnumeric states as empty bars, clamps the visual fill to 0–100%, and shows a target at zero. The updated editor does not rewrite YAML when opened; it converts the single-entity form to `entities` only after an edit. Existing `animation.state: 'on'` configurations now use value-change animation by default; add `mode: pulse` to preserve the continuous pulse.

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

`pnpm build` creates `dist/bar-card-next.js`. Commit this generated file whenever the source changes so HACS can install directly from the default branch. CI checks that the committed bundle matches the source. Tags beginning with `v` run the release workflow, which checks the project and attaches this file to a GitHub release for HACS.

## License

MIT. Original project by Lucas Bramlage and contributors.
